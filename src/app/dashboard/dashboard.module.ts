import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "../login/login/login.component";
import {RegisterComponent} from "../login/register/register.component";
import {DashboardComponent} from "./dashboard.component";
import {AdminHomeComponent} from "../admin-home/admin-home.component";
import {UserHomeComponent} from "../user-home/user-home.component";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {WebsiteHomeComponent} from "./website-home/website-home.component";
import { HomeComponent } from '../home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";



@NgModule({
  declarations: [
    DashboardComponent,
    AdminHomeComponent,
    UserHomeComponent,
    WebsiteHomeComponent,
  ],
  exports: [
    DashboardComponent,
    WebsiteHomeComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        NgxPaginationModule,


    ]
})
export class DashboardModule { }
