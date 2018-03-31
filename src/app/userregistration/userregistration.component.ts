import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent implements OnInit {

  constructor(private http:Http,private router: Router) { }

 
  conformationString:string="New User details has been added";
  emailPattern ="^\\w+([\\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$";
  textpattern="^[a-zA-Z\\s]+$";
  mobilepattern="^[2-9]{2}[0-9]{8}$";
  isAdded:boolean=false;
  
  userDeatilsObj:object=[];
  typesOfSeatsObj:object=[];
  types:object[]=[];
  
  ngOnInit() {
  }
  addData=function (user) {
    this.typesOfSeatsObj={
    "typesOfSeats":user.typesOfSeats,
    "Numberofseats":user.Numberofseats,
    "Priceperseat":user.Priceperseat
    }
    this.types.push(this.typesOfSeatsObj);
  }
  deleteType=function (i){
   // let id=typeOf.id;
   // this.types = this.types.filter(typesOfSeatsObj => typesOfSeatsObj.id !== id);
   //delete[this.types.indexOf(typeOf)];
   console.log("entry");
   console.log(i);
   this.types.splice(i, 1);
  }
  addNewUser=function (user) {
    
    this.userDeatilsObj={
      "":user.id,
      "FullName":user.FullName,
      "PassWord":user.PassWord,
      "MobileNo": user.MobileNo,
      "Email": user.perEmail,
      "typesofseats":this.typesOfSeatsObj,
      "joiningDate":user.joiningDate,
      "Tmrent": user.Tmrent,
      "Description": user.Description
      
    }
    
    
      this.http.post("http://localhost:5555/userdetails",this.userDeatilsObj).
    subscribe((res:Response)=>{
     this.isAdded=true;
     this.router.navigateByUrl("/home");
    })
  
  }


}
