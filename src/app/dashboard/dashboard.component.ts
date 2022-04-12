import { Component, OnInit } from '@angular/core';
import {AuthService, Role} from "../service/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  isnotGuess(){
    // Return true if user is not Guess
    return this.authService.role!=Role.Guess
  }
  logout(){
    this.authService.logout()
  }


}
