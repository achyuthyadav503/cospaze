import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import{UserInfoService} from './../shared/userInfo/user-info.service';


@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  constructor(private http:Http,private userinfo:UserInfoService) { }
  ChatUser:string;
  userDetailsObj;
  loginUser:string;
  ChatUSerid;
  LoginUserid;
  userMessages:object=[];
  messageDetailsObj:object=[];
  loginUserMessages:String[]=["Hi","How are you?","I'm fine.","what else?"];
  chatUserMessages:String[]=["Hi","I'm fine.","How are you?"];
  ngOnInit() {
    this.userDetailsObj=JSON.parse(localStorage.getItem("userdata"));
    console.log("user name "+this.userDetailsObj.name);
   // this.userinfo=JSON.parse(localStorage.getItem("userdata"));
    //console.log("user name "+this.userinfo.ChatUser);
    
    this.loginUser=this.userDetailsObj.name;
    this.LoginUserid=this.userDetailsObj.id;
    this.ChatUser=this.userinfo.ChatUser;
   this.ChatUSerid=this.userinfo.id;
    //call API here
    //let params = new HttpParams();
   // params.set("userid", this.LoginUserid)
   // let user = {"userid":this.LoginUserid};
   console.log("/CoAPI/get-user-messages.php?from="+this.LoginUserid+"&to="+this.ChatUSerid);
    this.http.get("/CoAPI/get-user-messages.php?from="+this.LoginUserid+"&to="+this.ChatUSerid).
  subscribe((res:Response)=>{
    console.log(res);
    
   let data = res.json();
    this.userMessages = data.messages;
    console.log("messages list"+this.userMessages);
     })
   // this.ChatUser=this.userinfo.getChatuser();
   
  }
  sendMessage (chat){
    console.log(chat);
    this.messageDetailsObj={
      "from":this.LoginUserid,
      "to":this.ChatUSerid,
      "message":chat
    };
    this.http.post("/CoAPI/send-message.php",this.messageDetailsObj).
    subscribe((res:Response)=>{
		console.log(res);
    
    // this.router.navigateByUrl("/home");
    })

  }

}
