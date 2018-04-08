import { Component, OnInit } from '@angular/core';
import{UserInfoService} from './../shared/userInfo/user-info.service';


@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  constructor(private userinfo:UserInfoService) { }
  ChatUser:string;
  userDetailsObj;
  loginUser:string;
  loginUserMessages:String[]=["Hi","How are you?","I'm fine."];
  chatUserMessages:String[]=["Hi","I'm fine.","How are you?"];

  ngOnInit() {
    this.userDetailsObj=JSON.parse(localStorage.getItem("userdata"));
    console.log("user name "+this.userDetailsObj.name);
    this.loginUser=this.userDetailsObj.name;
   // this.ChatUser=this.userinfo.getChatuser();
   this.ChatUser=this.userinfo.ChatUser;
  }

}
