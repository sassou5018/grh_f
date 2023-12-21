import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authservice/auth.service';


/**
 * Auth Guard
 * Checks validity of access token and / or retrieves it from local storage if saved
 *  
 * @returns 
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let accessToken: string | undefined | null = authService.accessToken;
  if(!accessToken) accessToken = localStorage.getItem('accessToken');
  if(!accessToken){
    router.navigate(['/auth/login']).then((nav) => {
      localStorage.removeItem("accessToken");
    })
    return false;
  };

  return new Promise((resolve, reject) => {
    authService.getMe().subscribe({
      next: data => {
        authService.user = data;
        resolve(true);
      },
      error: error=>{
        console.error(error);
        if(error.status == 401){
          router.navigate(['/auth/login']).then((nav) => {
            localStorage.removeItem("accessToken");
          })
        }
        router.navigate(['/auth/login']).then((nav) => {
          localStorage.removeItem("accessToken");
        })
        reject(false);
      }
    })
  });

  // let x= new Promise((resolve, reject) => {
  //   fetch("http://localhost:9999/api/protected/me", {headers: {"Authorization": "Bearer "+accessToken}}).then((res) => {
  //     console.log(res);
  //     resolve(true);
  //   })
  // });
  
};
