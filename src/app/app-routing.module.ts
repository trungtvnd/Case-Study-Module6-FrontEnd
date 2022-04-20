import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login/login.component";
import {GuardGuard} from "./service/auth/guard.guard";
import {Role} from "./service/auth/auth.service";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import {UserHomeComponent} from "./user-home/user-home.component";
import {RegisterComponent} from "./login/register/register.component";
import {HomeComponent} from "./home/home.component";
import {UserComponent} from "./user/user/user.component";
import {DialogUserComponent} from "./user/dialog-user/dialog-user.component";
import {User1Component} from "./user1/user1.component";
import {PostComponent} from "./post/post.component";
import firebase from "firebase/compat";
import User = firebase.User;

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'home', component: HomeComponent},
  {path:'createPost', component: DialogUserComponent},
  {path:'user', component: UserComponent},
  {path:'admin', component: AdminHomeComponent},
  {path:'post', component: PostComponent},
  {path:'user1', component: User1Component},
  // {path:'user1', component: User1Component, canActivate :[GuardGuard]},
  // {path:'admin', component: AdminHomeComponent, canActivate :[GuardGuard], data: { roles: [Role.Admin]}},
  // {path:'dashboard', component: DashboardComponent,
  //   children:[
  //     {path:'user', component: UserHomeComponent},
  //     {path:'admin', component: AdminHomeComponent, canActivate: [GuardGuard], data: { roles: [Role.Admin]} }
  //   ]},
  {path:'**', component: HomeComponent},
];

// @ts-ignore
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
