import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Http,Response,Headers}from '@angular/http';
import{UserInfoService} from './../shared/userInfo/user-info.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private router: Router,private http:Http,private userinfo:UserInfoService) { }

  messages:string[]=["new1","new2"];
  userDetailsObj;
  loginUser:string;
  LoginUserid;
  userMessages:object=[];
  
  ngOnInit() {

    this.userDetailsObj=JSON.parse(localStorage.getItem("userdata"));
    console.log("user name "+this.userDetailsObj.name);
   // this.userinfo=JSON.parse(localStorage.getItem("userdata"));
    //console.log("user name "+this.userinfo.ChatUser);
    
    this.loginUser=this.userDetailsObj.name;
    this.LoginUserid=this.userDetailsObj.id;

    this.http.get("/CoAPI/get-user-messages.php?from="+this.LoginUserid).
    subscribe((res:Response)=>{
      console.log(res);
      
     let data = res.json();
      this.userMessages = data.messages;
      console.log("messages list"+this.userMessages);
       })
  }


  sendMessage(data,id){
   console.log(data);
 
   this.userinfo.ChatUser=data;
   this.userinfo.id=id;
   //localStorage.setItem("chatuserinfo", JSON.stringify(this.userinfo));
   //this.router.navigate(['/messages',{p1:data}]);
   this.router.navigate(['/messages']);
  }

}
