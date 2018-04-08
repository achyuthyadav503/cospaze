import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Http,Response,Headers}from '@angular/http';
import{UserInfoService} from './../shared/userInfo/user-info.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private http:Http,private userinfo:UserInfoService) { }
  conformationString:string="Your details has been added";
  isAdded:boolean=false;
  userDetailsObj;
  serviceDetailsObj;
  islogedin:boolean=false;
  isAdmin:boolean=false;
  isOffice:boolean=false;
  isCompany:boolean=false;
  isEmployee:boolean=false;
  role:String;
  name:String;
  memberList = [];
  serviceList = [];
  services=[];
  showDialog = false;
  listYourData:object=[];
  ngOnInit() {
    
    this.userDetailsObj=JSON.parse(localStorage.getItem("userdata"));
    console.log("user name "+this.userDetailsObj.name);
   if(this.userDetailsObj!= null){
    this.islogedin=true;
    this.role=this.userDetailsObj.role;
    if(this.role=='admin'){
      this.isAdmin = true;
      this.isOffice = true;
      this.isCompany = true;
    }
    if(this.role=='office'){
      this.isOffice = true;
      this.isCompany = true;
    }
    if(this.role=='company'){
      this.isCompany = true;
    }
    if(this.role=='employee'){
      this.isEmployee = true;
    }
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

  this.http.get("/CoAPI/service-list.php").
  subscribe((res:Response)=>{
    console.log('response services');
    
   let data = res.json();
   console.log(data);
    this.services = data.servicesList;
    console.log(this.services);
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

  messages(data){
   console.log(data);
   this.userinfo.ChatUser=data;
   //this.router.navigate(['/messages',{p1:data}]);
   this.router.navigate(['/messages']);
  }
  open(){
   this. showDialog =true;
}
addYourdetails=function (yourdata){
  let x= yourdata.value;
  console.log(x);
  this.listYourData={
    "service":x.Service,
    "user":this.userDetailsObj.id   
  }
  console.log(this.listYourData);
  this.http.post("/CoAPI/list-yourself.php",this.listYourData).
  subscribe((res:Response)=>{
 console.log(res);
 //here if it is success then the user which we added and service we will get
 //this.services[] = res.service;
   this.isAdded=true;
   yourdata.reset();
  // this.router.navigateByUrl("/home");
  })
 

 }
  

}
