import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    NewUserComponent,
    UpdateUserComponent,
    NavbarComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
