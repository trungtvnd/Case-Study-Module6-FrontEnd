import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserHomeComponent } from './dashboard/user-home/user-home.component';
import { AdminHomeComponent } from './dashboard/admin-home/admin-home.component';
import { WebsiteHomeComponent } from './dashboard/website-home/website-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    UserHomeComponent,
    AdminHomeComponent,
    WebsiteHomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
