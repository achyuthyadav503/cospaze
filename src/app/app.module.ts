import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import{HttpModule} from '@angular/http';
import{RouterModule} from '@angular/router';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    ErrorpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path:"",component:LoginComponent},
     {path:"home",component:HomeComponent},
     {path:"errorpage",component:ErrorpageComponent},
     {path:"home/register",component:RegistrationComponent},
     {path:"register",component:RegistrationComponent}
     ])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
