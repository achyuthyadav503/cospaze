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
import { SearchComponent } from './search/search.component';
import { CompregistrationComponent } from './compregistration/compregistration.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    ErrorpageComponent,
    SearchComponent,
    CompregistrationComponent,
    UserregistrationComponent
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
    {path:"register",component:RegistrationComponent},
     {path:"home/search",component:SearchComponent},
     {path:"home/register-company",component:CompregistrationComponent},
     {path:"home/register-employee",component:UserregistrationComponent}
     ])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
