import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCardModule} from "@angular/material/card";
import {AuthInterceptor} from "./service/auth/auth.interceptor";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {DialogUserComponent} from './user/dialog-user/dialog-user.component';
import {UserComponent} from "./user/user/user.component";
import {NgxPaginationModule} from "ngx-pagination";
import {MatMenuModule} from "@angular/material/menu";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {Ng2OrderModule} from "ng2-order-pipe";
import {User1Component} from "./user1/user1.component";
import { PostComponent } from './post/post.component';
import { DialogChangePasswordComponent } from './user/dialog-change-password/dialog-change-password.component';
import {CKEditorModule} from "ng2-ckeditor";
import {AdminHomeComponent} from "./admin-home/admin-home.component";
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    DialogUserComponent,
    User1Component,
    PostComponent,
    DialogChangePasswordComponent,
    AdminHomeComponent,
    DialogAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatMenuModule,
    RouterModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
