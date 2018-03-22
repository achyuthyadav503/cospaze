import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  userDetailsObj:object=[];
  islogedin:boolean=false;
  name:String;
  ngOnInit() {
    this.name=(localStorage.getItem("userdata"));
    this.userDetailsObj=JSON.parse(localStorage.getItem("userdata"));
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
