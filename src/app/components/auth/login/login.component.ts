import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/authservice/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService],
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        remember: [true]
      })

    constructor(public layoutService: LayoutService, private fb: FormBuilder, private authService: AuthService, private toast: MessageService, private router: Router) { }



    onSubmit(loginForm: FormGroup) {
        this.authService.postLogin({
          username: loginForm.value.username,
          password: loginForm.value.password
        }).subscribe({
          next: data => {
            this.authService.setAccessToken(data.accessToken);
            if(this.loginForm.value.remember) localStorage.setItem('accessToken', data.accessToken);
            console.log(this.authService);
            this.toast.add({severity:'success', summary:'Success', detail:'Login successful'})
            this.loginForm.disable();
            setTimeout(() => {
              this.router.navigate(['/']).then((nav) => {
                console.log(nav); // true if navigation is successful
              }).catch((err) => {
                console.error(err) // when there's an error
              });
            }, 300);
          },
          error: error => {
            console.log(error)
            if(error.status == 400){
              this.toast.add({severity:'error', summary:'Error', detail:'Invalid username or password'})
              this.loginForm.setErrors({wrongUser: true})
            }else{
              this.toast.add({severity:'error', summary:'Error', detail:'Something went wrong'})
            }
          }
        })
        
      }
}
