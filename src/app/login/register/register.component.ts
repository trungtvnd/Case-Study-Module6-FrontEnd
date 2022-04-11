import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth/auth.service";
import {SignUp} from "../../model/sign-up-form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status = '';
  form: any = {};
  signUpForm!: SignUp;
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ])
  error1: any = {
    message: "nouser"
  }
  error2: any = {
    message: "noemail"
  }
  success: any = {
    message: "ok"
  }
  checkSuccess: boolean = false;


  constructor(private router: Router,
              private authService:AuthService) { }

  ngOnInit(): void {

  }

  ngSubmit(){
    this.signUpForm = new SignUp(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    )
    this.authService.signUp(this.signUpForm).subscribe(data =>{
      console.log('data = ', data);
      // check loi tra ra tu backend
      if(JSON.stringify(data)==JSON.stringify(this.error1)){
        this.status = 'The username is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.error2)){
        this.status = 'The email is existed! Please try again!'
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Create User account success!'
        this.checkSuccess = true;
      }
      this.router.navigate(['/login'])
    })

}}
