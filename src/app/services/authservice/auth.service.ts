import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthRequest, IAuthResponse, IPrivilege, IUser } from '../../interfaces/IAuth';
import getEnv from 'src/app/envResolver';
import { Router } from '@angular/router';


const API_URL = getEnv().API_URL;


export const authFactory = (httpClient: HttpClient)=>()=>{
  console.log("AuthFactory")
  const token = localStorage.getItem('accessToken');
  // if(token){
  //   return httpClient.get<IUser>(API_URL + `/api/protected/me`, { headers: {"",""}})
  
  // }

}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: string | undefined;
  authorities: undefined | IPrivilege[];
  user: undefined | IUser;

  constructor(private http: HttpClient, private router: Router) { }

  postLogin(data: IAuthRequest) {
    return this.http.post<IAuthResponse>("/api" +`/api/auth/login`, data)
  }

  getMe(){
    return this.http.get<IUser>("/api" + `/api/protected/me`)
  }

  refreshToken(){
    return this.http.get<IAuthResponse>("/api" + "/api/auth/refresh", { headers: {"Access-Control-Allow-Origin": "http://localhost:4200", "Access-Control-Allow-Credentials": "true"}})
  }

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  setAuthorities(authorities: IPrivilege[]){
    this.authorities = authorities;
  }

  getAuthorities(){
    return this.authorities;
  }

  pushToAuthorities(authority: IPrivilege){
    if(this.authorities){
      this.authorities.push(authority);
    } else {
      this.authorities = [authority];
    }
  }

  clearAuthorities(){
    this.authorities = undefined;
  }

  setUser(user: IUser){
    this.user = user;
  }

  getUser(){
    return this.user;
  }

  logout(){
    this.accessToken = undefined;
    this.authorities = undefined;
    localStorage.removeItem('accessToken');
    this.router.navigate(['/auth/login'])
  }
}
