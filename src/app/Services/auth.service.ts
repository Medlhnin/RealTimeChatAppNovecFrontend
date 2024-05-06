import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import { TokenApiModel } from '../models/token-api.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseApi:string = "https://localhost:7086/Api/User/";
  private userPayload:any;

  constructor(private http : HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(user:User):Observable<User>{
    return this.http.post<User>(this.baseApi+"register",user);
  }


  signIn(loginObj : any){
    return this.http.post<any>(`${this.baseApi}authenticate`,loginObj);
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  storeRefreshToken(tokenValue: string){
    localStorage.setItem('refreshToken', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  getRoomId(){
    if(localStorage.getItem('roomId'))
    {
      return localStorage.getItem('roomId');
    }
    else
    {
      return '0';
    }
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    // console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  getIdentifierFromToken(){
    if(this.userPayload)
    return this.userPayload.nameid;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseApi}refresh`, tokenApi)
  }
}

