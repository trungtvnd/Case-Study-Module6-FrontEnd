import { Component, OnInit } from '@angular/core';
import {AuthService, Role} from "../../service/auth/auth.service";

@Component({
  selector: 'app-website-home',
  templateUrl: './website-home.component.html',
  styleUrls: ['./website-home.component.css']
})
export class WebsiteHomeComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }



}
