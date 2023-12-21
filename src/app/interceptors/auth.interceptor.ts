import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authservice/auth.service';

const AUTH_WHITELIST = [
  "/swagger-resources",
  "/swagger-resources/",
  "/configuration/ui",
  "/configuration/security",
  "/swagger-ui.html",
  "/webjars/",
  "/v3/api-docs/",
  "/api/public/",
  "/api/auth/",
  "/api/public/authenticate",
  "/actuator/",
  "/swagger-ui/"
]

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.includes("api/auth")) return next.handle(request);
    const  accessToken = this.authService.getAccessToken() || localStorage.getItem('accessToken');
    if(!accessToken) return next.handle(request);

    console.log("appending", accessToken);
    
    const appendedHeaders = request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    return next.handle(appendedHeaders);
  }
}
