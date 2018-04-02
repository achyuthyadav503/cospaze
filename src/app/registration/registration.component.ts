import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private http:Http,private router: Router) { }
  conformationString:string="New Co space details has been added";
  emailPattern ="^\\w+([\\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$";
  textpattern="^[a-zA-Z\\s]+$";
  mobilepattern="^[2-9]{2}[0-9]{8}$";
  isAdded:boolean=false;
  OfficeDetailsObj:object=[];
  userDeatilsObj:object=[];
  typesOfSeatsObj:object=[];
  types:object[]=[];
  cities=[];
  loctaions=[];
  loctaionsByCity=[];
  
  ngOnInit() {

    this.http.get("/CoAPI/catalouge-list.php").
  subscribe((res:Response)=>{
    console.log('response catalogue');
    
   let data = res.json();
   console.log(data);
    this.cities = data.cityList;
    this.loctaions=data.locationList;
    console.log(this.cities);
  })



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
  addNewUser=function (regform) {
    let user=regform.value;
    console.log('click add');
    this.OfficeDetailsObj={
      "":user.id,
      "OfficeName":user.OfficeName,
      "Address":user.Address,
      "Location": user.Location,
      "City": user.City
    }
    this.userDeatilsObj={
      "UserName":user.UserName,
      "PassWord":user.PassWord,
      "MobileNo": user.MobileNo,
      "Email": user.perEmail
    }
    this.http.post("/CoAPI/register-office.php",this.OfficeDetailsObj).
    subscribe((res:Response)=>{
      let data = res.json();
      let officeData = data.details;
      let officeId = officeData.officeID;
      this.userDeatilsObj={
        "UserName":this.userDeatilsObj.UserName,
        "PassWord":this.userDeatilsObj.PassWord,
        "MobileNo": this.userDeatilsObj.MobileNo,
        "Email": this.userDeatilsObj.perEmail,
        "OfficeId": officeId
      }
      this.http.post("/CoAPI/register.php",this.userDeatilsObj).
    subscribe((res:Response)=>{
		console.log(res);
     this.isAdded=true;
     regform.reset();
    // this.router.navigateByUrl("/home");
    })
    })
  }

  reset=function (Form) {
    Form.reset();
  }
  updateLocations=function(City){
    console.log(City);
    console.log(this.loctaions);
    if(City!='')
    this.loctaionsByCity=this.loctaions[City];
    console.log(this.loctaionsByCity);
  }

}
