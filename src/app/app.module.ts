import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import{HttpModule} from '@angular/http';
import{RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFormsModule } from 'ng4-validators';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { SearchComponent } from './search/search.component';
import { CompregistrationComponent } from './compregistration/compregistration.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { MenuComponent } from './menu/menu.component';
import { ListyourselfComponent } from './listyourself/listyourself.component';
import { UserMessagesComponent } from './user-messages/user-messages.component';
import { InboxComponent } from './inbox/inbox.component';
import { UserInfoService } from './shared/userInfo/user-info.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    ErrorpageComponent,
    SearchComponent,
    CompregistrationComponent,
    UserregistrationComponent,
    MenuComponent,
    ListyourselfComponent,
    UserMessagesComponent,
    InboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path:"",component:LoginComponent},
     {path:"home",component:HomeComponent},
     {path:"errorpage",component:ErrorpageComponent},
	 {path:"home/register",component:RegistrationComponent},
    {path:"register",component:RegistrationComponent},
     {path:"home/search",component:SearchComponent},
     {path:"register-company",component:CompregistrationComponent},
     {path:"register-employee",component:UserregistrationComponent},
     {path:"messages",component:UserMessagesComponent},
     {path:"inbox",component:InboxComponent}
     ])
    
  ],
  providers: [UserInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
