import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Http,Response,Headers}from '@angular/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,private http:Http) { }
  userDetailsObj;
  serviceDetailsObj;
  islogedin:boolean=false;
  name:String;
  memberList = [];
  serviceList = [];
  ngOnInit() {
    this.userDetailsObj=JSON.parse(localStorage.getItem("userdata"));
    console.log("user name "+this.userDetailsObj.name);
   if(this.userDetailsObj!= null){
    this.islogedin=true;
   }else{
    this.router.navigateByUrl("errorpage");
   }
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("");

  }
  home(){
    this.router.navigateByUrl("/home");

  }
  registerOffice(){
    this.router.navigateByUrl("/register");

  }
  registerCompany(){
    this.router.navigateByUrl("/register-company");

  }
  registerEmployee(){
    this.router.navigateByUrl("/register-employee");

  }

}