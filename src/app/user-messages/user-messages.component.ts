import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import{UserInfoService} from './../shared/userInfo/user-info.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/interval';
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

    Observable.interval(20 * 60).subscribe(messageDetailsObj => {
      console.log('called');
       this.http.get("/CoAPI/get-user-messages.php?from="+this.LoginUserid+"&to="+this.ChatUSerid).
  subscribe((res:Response)=>{
    console.log(res);
    
   let data = res.json();
    this.userMessages = data.messages;
    console.log("messages list"+this.userMessages);
     })
    });
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
 //  console.log("/CoAPI/get-user-messages.php?from="+this.LoginUserid+"&to="+this.ChatUSerid);
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
    let message = chat.value;
    this.messageDetailsObj={
      "from":this.LoginUserid,
      "to":this.ChatUSerid,
      "message":message
    };
    this.http.post("/CoAPI/send-message.php",this.messageDetailsObj).
    subscribe((res:Response)=>{
		console.log(res);
    this.messageDetailsObj={
      "message_from":this.LoginUserid,
      "message_to":this.ChatUSerid,
      "fromUser":this.loginUser,
      "toUser":this.ChatUser,
      "message":message,
      "isFrom":1
    };
    //chat.value = '';
     chat.reset();
   //  this.userMessages.push(this.messageDetailsObj);

     this.http.get("/CoAPI/get-user-messages.php?from="+this.LoginUserid+"&to="+this.ChatUSerid).
  subscribe((res:Response)=>{
    console.log(res);
    
   let data = res.json();
    this.userMessages = data.messages;
    console.log("messages list"+this.userMessages);
     })
    // this.router.navigateByUrl("/home");
    })

  }

}
