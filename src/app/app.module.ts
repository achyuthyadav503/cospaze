import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule} from '@angular/forms';
import{HttpModule} from '@angular/http';
import{RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomFormsModule } from 'ng4-validators';
import { MyDatePickerModule } from '../../node_modules/angular4-datepicker/src/my-date-picker';

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
import { MessagelogComponent } from './messagelog/messagelog.component';
import { UserInfoService } from './shared/userInfo/user-info.service';
import { OfficeInfoService } from './shared/officeInfo/office-info.service';
import { PaymentsComponent } from './payments/payments.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { OfficelistComponent } from './officelist/officelist.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { FeedbackComponent } from './feedback/feedback.component';
import {OfficeDetailsComponent} from './officedetails/officedetails.component';
import { CalendarModule } from 'angular-calendar';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Ng2CompleterModule } from "ng2-completer";
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { MembersComponent } from './members/members.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
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
    InboxComponent,
    MessagelogComponent,
    PaymentsComponent,
    CompanylistComponent,
    OfficelistComponent,
    EmployeelistComponent,
    PaymentlistComponent,
    FeedbackComponent,
    OfficeDetailsComponent,
    SuggestionListComponent,
    MembersComponent,
    ActivateAccountComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    MyDatePickerModule,
    NgDatepickerModule,
    Ng2CompleterModule,
    RouterModule.forRoot([
      {path:"",component:LoginComponent},
     {path:"home",component:HomeComponent},
     {path:"errorpage",component:ErrorpageComponent},
	 {path:"home/register",component:RegistrationComponent},
    {path:"register",component:RegistrationComponent},
     {path:"home/search",component:SearchComponent},
     {path:"register-company",component:CompregistrationComponent},
     {path:"register-employee",component:UserregistrationComponent},
     {path:"messages/:userId/:userName",component:UserMessagesComponent},
     {path:"inbox",component:InboxComponent},
     {path:"payment",component:PaymentsComponent},
     {path:"employeelist",component:EmployeelistComponent},
     {path:"officelist",component:OfficelistComponent},
     {path:"companylist",component:CompanylistComponent},
      {path:"paymentlist",component:PaymentlistComponent},
      {path:"office-details/:id",component:OfficeDetailsComponent},
       {path:"suggestionDetails",component:SuggestionListComponent},
       {path:"membersDetails",component:MembersComponent},
       {path:"activateAccount",component:ActivateAccountComponent}
     ])
    
  ],
  providers: [UserInfoService,OfficeInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
