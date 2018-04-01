import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Http,Response,Headers}from '@angular/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private http:Http) { }
  userDetailsObj;
  serviceDetailsObj;
  islogedin:boolean=false;
  name:String;
  memberList = [];
  serviceList = [];
  DisplayDialogBox=false;
  ngOnInit() {
    
    this.userDetailsObj=JSON.parse(localStorage.getItem("userdata"));
    console.log("user name "+this.userDetailsObj.name);
   if(this.userDetailsObj!= null){
    this.islogedin=true;
   }else{
    this.router.navigateByUrl("errorpage");
   }


  this.http.get("/CoAPI/members.php").
  subscribe((res:Response)=>{
    console.log('response');
    
   let data = res.json();
    this.memberList = data.memberList;
    console.log("member list"+this.memberList);
  })

  this.http.get("/CoAPI/services.php").
  subscribe((res:Response)=>{
    console.log('response');
    
   let data = res.json();
    this.serviceList = data.serviceList;
    console.log(this.serviceList);
  })


  }

  listYourself=function (search) {
    
        this.serviceDetailsObj={
          "useId":search.Location,
          "serviceId" :search.NoSeats
        }
        console.log("in search");
        console.log(this.searchDeatilsObj);
        this.http.post("/CoAPI/search.php",this.searchDeatilsObj).
        subscribe((res:Response)=>{
          console.log('response');
          
         let data = res.json();
          this.list = data.list;
          console.log(this.list);
        })
    
      }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl("");

  }

  open(){
   this.DisplayDialogBox=true;
  }
  

}
