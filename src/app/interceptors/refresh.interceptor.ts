import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, retry, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/authservice/auth.service';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("refresh interceptor");
    const accessToken = this.authService.accessToken || localStorage.getItem('accessToken');
    console.log("access token", accessToken);
    return next.handle(request).pipe(
      catchError((error, _caught) => {
        if(error.status === 403 && accessToken){
          console.log("refreshing token");
          return this.authService.refreshToken().pipe(
            switchMap(data => {
              this.authService.setAccessToken(data.accessToken);
              if(localStorage.getItem('accessToken')){
                localStorage.setItem('accessToken', data.accessToken);
              }
              // Clone the original request and set the new access token in the header
              const authReq = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${data.accessToken}`
                }
              });
              // Retry the HTTP request with the new token
              return next.handle(authReq);
            }),
            catchError((err, _caught) => {
              // If there is an exception calling 'refreshToken', bad news so logout.
              console.log(err);
              return throwError(()=>error);
            })
          );
        }
        // Default behaviour
        return next.handle(request);
      })
    );
  }
}
