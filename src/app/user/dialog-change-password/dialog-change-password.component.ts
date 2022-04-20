import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/blog/user.service";
import {AuthService} from "../../service/auth/auth.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Route, Router} from "@angular/router";
import {ChangePassword} from "../../model/changePassword";
import {SignUp} from "../../model/sign-up-form";

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.css']
})
export class DialogChangePasswordComponent implements OnInit {
  formChangePassword!: ChangePassword
  form: any = {};
  hide = true;
  error1:any = {
    message: '600'
  }
  error2:any = {
    message: '601'
  }
  success:any = {
    message: 'change password successfully'
  }
  status = 'Please Fill in the form'

  constructor(private formBuilder:FormBuilder,
              private userService:UserService,
              private authService:AuthService,
              private matDialogRef: MatDialogRef<DialogChangePasswordComponent>,
              private router:Router) { }

  ngOnInit(): void {

  }

  changePassword() {
    this.formChangePassword = new ChangePassword(
      this.form.currentPassword,
      this.form.newPassword,
      this.form.confirmNewPassword,

    )
    this.userService.changePassword(this.formChangePassword).subscribe((data)=>{
      console.log(data)
      if(JSON.stringify(data) == JSON.stringify(this.error1)){
        this.status = 'Current password not correct'
    }
      if(JSON.stringify(data) == JSON.stringify(this.error2)){
        this.status = 'Confirm Password not match with new password'
      }

    if(JSON.stringify(data) == JSON.stringify(this.success)){
      this.status = 'change password successfully'
     window.sessionStorage.clear()
      this.router.navigate(['/login']).then(()=>{
        window.location.reload();
      })
    }

    })

  }

}
