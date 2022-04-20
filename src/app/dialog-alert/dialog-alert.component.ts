import { Component, OnInit } from '@angular/core';
import {SignInForm} from "../model/sign-in-form";
import {AuthService, Role} from "../service/auth/auth.service";
import {TokenService} from "../service/auth/token.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.css']
})
export class DialogAlertComponent implements OnInit {

  status = '';
  form: any = {};
  signInForm!: SignInForm;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  role!:string
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router,
              private matDialogRef: MatDialogRef<DialogAlertComponent>) { }
  roles: string[] = [];
  name!: string;
  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLoggedIn = true;
      this.roles = this.tokenService.getRoles();
      this.name = this.tokenService.getName();
    }
  }
  ngSubmit(){

    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    )
    console.log('signInForm', this.signInForm)
    this.authService.signIn(this.signInForm).subscribe(data =>{
      console.log('data', data)
      if(data.token != undefined){
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.fullName);
        // this.tokenService.setUsername(data.username);
        this.name = this.tokenService.getName();

        this.tokenService.setRoles(data.roles);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        for (let i = 0; i < data.roles.length; i++) {
          if(data.roles[i]['authority'] === 'ADMIN'){
            this.role = Role.Admin
          }else if (data.roles[i]['authority'] === 'USER'){
            this.role = Role.User
          }
        }
        this.matDialogRef.close()
        localStorage.setItem("roleLogin", this.role)
      } else {
        this.isLoggedIn = false;
        this.isLoginFailed = true;
        console.log('loginFailed', this.isLoginFailed)
        console.log('isLoggedIn', this.isLoggedIn);
        this.status = 'Login Failed! Please try again!'
      }
    }, error => {
      console.log('error', error)
      this.status = "User or password not correct"
      this.isLoginFailed = true;
    })
  }

}
