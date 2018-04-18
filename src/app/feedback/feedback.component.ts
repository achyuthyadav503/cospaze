import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit{

  constructor(private http:Http) { }

  textpattern="^[a-zA-Z\\s]+$";
  data;
   isAdded:boolean=false;
  feedbackObj:object=[];
  typesOfSeatsObj;
  types:object[]=[];
  loginObj:object=[];
  today:Date=new Date();
  userDetailsObj;
  isAdmin:boolean=false;
  islogedin:boolean=false;
  isOffice:boolean=false;
  isCompany:boolean=false;
  isnewCompany:boolean=false;
  isFreelancer:boolean=false;
  role:String;
  ngOnInit(){

    this.loginObj=JSON.parse(localStorage.getItem("userdata"));
   if(this.loginObj!= null){
    this.islogedin=true;

  }
  }

addFeedback = function(feedbackData){
let feedbackdata = feedbackData.value;
this.feedbackObj={
          "useId":this.loginObj.id,
          "message" :feedbackdata.message,
        }
this.http.post("/CoAPI/feedback.php",this.feedbackObj).
    subscribe((res:Response)=>{
     feedbackData.reset();

})
  
}
}
