import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';
import { RefreshInterceptor } from 'src/app/interceptors/refresh.interceptor';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule
    ],
    providers:[
        { provide: HTTP_INTERCEPTORS, useClass: RefreshInterceptor, multi: true},
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ]
})
export class AuthModule { }
