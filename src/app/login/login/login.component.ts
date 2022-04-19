import { Component, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import {TokenService} from "../../service/auth/token.service";
import {SignInForm} from "../../model/sign-in-form";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = 'Please fill in the form';
  form: any = {};
  signInForm!: SignInForm;
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;




  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }
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
    this.authService.onSubmit(this.signInForm)
  }

}
