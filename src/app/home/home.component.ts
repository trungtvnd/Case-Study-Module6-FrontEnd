import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../service/blog/user.service";
import firebase from "firebase/compat";
import {User} from "../model/User";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nameLogin!:string | null
  user!:User

  constructor(private authService:AuthService,
              private router:Router,
              private userService:UserService
              ) { }

  ngOnInit(): void {
    this.nameLogin = localStorage.getItem('nameLogin')
    this.findUser(this.nameLogin)
  }

  public checkLogin(){

    return this.authService.loggined()
  }

  public logout(){
    localStorage.removeItem('nameLogin')
    localStorage.removeItem('idLogin')
    this.router.navigate(['/login'])
  }

  public findUser(fullName:any){
    this.userService.findUserByFullName(fullName).subscribe(data => {
      this.user = data;
      console.log(data.id)
      localStorage.setItem("idLogin", String(data.id))
      localStorage.setItem("userLogin", JSON.stringify(this.user))
    })
  }



}
