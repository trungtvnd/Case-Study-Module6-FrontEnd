import { Injectable } from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {SignUp} from "../../model/sign-up-form";
import {SignInForm} from "../../model/sign-in-form";
import {JwtResponse} from "../../model/jwt-response";
import {TokenService} from "./token.service";
import {UserService} from "../blog/user.service";
import {User} from "../../model/User";


export enum Role{
  Guess= 'GUESS',
  User = 'USER',
  Admin = 'ADMIN'
}
const API_AUTH = environment.apiAuth;
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  nameLogin!: string
  role!: Role;
  name!: string;
  status = '';
  user!:User;
  idUser!:number;

  isLoggedIn = false;
  isLoginFailed = false;

  constructor(private httpClient:HttpClient,
  private router:Router,
              private tokenService: TokenService,
              private userService:UserService) { }

  public signUp(signUp:SignUp):Observable<any>{
    return this.httpClient.post<any>(API_AUTH + '/signup', signUp);
  }

  public signIn(signIn:SignInForm):Observable<JwtResponse>{
    return this.httpClient.post<JwtResponse>(API_AUTH + '/signin', signIn);
  }

  public loggined(){
    const token = sessionStorage.getItem(TOKEN_KEY);
    const username = sessionStorage.getItem(NAME_KEY);
    const authority = sessionStorage.getItem(ROLE_KEY);
    if(username && token && authority){
      return true
    }
    return false;
  }

  public login(): void {
    this.router.navigate(['/login']);
  }

  public onSubmit(signIn: SignInForm){
    this.signIn(signIn).subscribe(data => {
      console.log('data', data)
      if(data.token != undefined){
        this.tokenService.setToken(data.token)
        this.tokenService.setName(data.fullName)
        this.name = this.tokenService.getName()
        this.tokenService.setRoles(data.roles)
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.nameLogin = data.fullName
        console.log(this.nameLogin)
        for (let i = 0; i < data.roles.length; i++) {
          if(data.roles[i]['authority'] === 'ADMIN'){
            this.role = Role.Admin
          }else if (data.roles[i]['authority'] === 'USER'){
            this.role = Role.User
          }
        }
        console.log('role',this.role)
        if(this.role === Role.Admin){
          this.router.navigate(['/admin'])
        }else if(this.role === Role.User){
          this.router.navigate(['/'])
        }else {
          this.router.navigate(['/home'])
        }
        localStorage.setItem("nameLogin", data.fullName)
        localStorage.setItem("roleLogin", this.role)

      }else {
        this.isLoggedIn = false;
        this.isLoginFailed = true;
        console.log('loginFailed', this.isLoginFailed)
        console.log('isLoggedIn', this.isLoggedIn);
        this.status = 'Login Failed! Please try again!'
      }
    })
  }
  logout(){
    this.router.navigate(['/login']);
  }

  isAuthenticated(){
    // return true if the user enter correct user name and password
    return this.isLoggedIn
  }

}
