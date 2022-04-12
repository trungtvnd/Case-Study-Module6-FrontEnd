import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {GuardGuard} from "./service/auth/guard.guard";
import {Role} from "./service/auth/auth.service";
import {AdminHomeComponent} from "./dashboard/admin-home/admin-home.component";
import {UserHomeComponent} from "./dashboard/user-home/user-home.component";
import {WebsiteHomeComponent} from "./dashboard/website-home/website-home.component";
import {HomeComponent} from "./dashboard/home/home.component";
import {RegisterComponent} from "./login/register/register.component";

const routes: Routes = [
  {path:'login', component: LoginComponent},


  {path:'dashboard', component: DashboardComponent,canActivate: [GuardGuard],
    children:[
      {path:'register', component: RegisterComponent},
      {path:'user', component: UserHomeComponent},
      {path:'admin', component: AdminHomeComponent, canActivate: [GuardGuard], data: { roles: [Role.Admin]} }
    ]},
  {path:'**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
