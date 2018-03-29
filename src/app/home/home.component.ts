import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  userDetailsObj;
  islogedin:boolean=false;
  name:String;
  ngOnInit() {
    this.name=(localStorage.getItem("userdata"));
    console.log("form user name "+localStorage.getItem("userdata"));
    this.userDetailsObj=JSON.parse(localStorage.getItem("userdata"));
    console.log("form user name "+this.userDetailsObj.name);
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

}
