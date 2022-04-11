import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "../login/login/login.component";
import {RegisterComponent} from "../login/register/register.component";
import {DashboardComponent} from "./dashboard.component";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {UserHomeComponent} from "./user-home/user-home.component";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";



@NgModule({
  declarations: [
    DashboardComponent,
    AdminHomeComponent,
    UserHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,

  ]
})
export class DashboardModule { }
