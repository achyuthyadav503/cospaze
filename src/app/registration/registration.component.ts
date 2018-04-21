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
  officeAmenitiesObj:object=[];
  amenities:object[]=[];
  logo;
  ngOnInit() {

    this.http.get("/CoAPI/catalouge-list.php").
  subscribe((res:Response)=>{
    console.log('response catalogue');
    
   let data = res.json();
   console.log(data);
    this.cities = data.cityList;
    this.loctaions=data.locationList;
    console.log(this.cities);
  });

    this.typesOfSeatsObj={
    "typesOfSeats":"",
    "numberOfSeats":"",
    "pricePerSeat":"",
    }
    this.types.push(this.typesOfSeatsObj);

 this.officeAmenitiesObj ={
      "officeAmenities":""
    }

    this.amenities.push(this.officeAmenitiesObj);

  }
  addData=function (user) {
    this.typesOfSeatsObj={
    "typesOfSeats":"",
    "numberOfSeats":"",
    "pricePerSeat":"",
    }
    this.types.push(this.typesOfSeatsObj);
  }

  addAmenities= function(user){
    this.officeAmenitiesObj ={
      "officeAmenities":""
    }

    this.amenities.push(this.officeAmenitiesObj);
  }
  deleteType=function (i){
   // let id=typeOf.id;
   // this.types = this.types.filter(typesOfSeatsObj => typesOfSeatsObj.id !== id);
   //delete[this.types.indexOf(typeOf)];
   console.log("entry");
   console.log(i);
   this.types.splice(i, 1);
  }
  deleteAmenities = function(i){
     this.amenities.splice(i, 1);
  }
  addNewUser=function (regform) {

    let fi = this.fileInput.nativeElement;
    let fileToUpload = fi.files[0];
    this.input = new FormData();
    this.input.append("file", fileToUpload);
    let headers = new Headers();

    let user=regform.value;
    console.log('click add');
    this.OfficeDetailsObj={
      "":user.id,
      "OfficeName":user.OfficeName,
      "Address":user.Address,
      "Location": user.Location,
      "City": user.City,
       "Description": user.Description,
       "typesofseats":this.types,
       "amenities":this.amenities,
    }
    this.userDeatilsObj={
      "UserName":user.UserName,
      "PassWord":user.PassWord,
      "MobileNo": user.MobileNo,
      "Email": user.perEmail
    }
    this.http.post("/CoAPI/register-office.php",this.OfficeDetailsObj).
    subscribe((res:Response)=>{
/*      let data = res.json();
      let officeData = data.details;
      let companyId = officeData.companyId;
       this.input.append("companyId", companyId);*/
console.log(res);
      
      let data = res.json();
      let officeData = data.details;
      let officeId = officeData.officeID;
      this.input.append("officeId", officeId);
      this.http.post("/CoAPI/officeuploadfile.php",this.input, { headers: headers, method: 'POST'}).subscribe((res:Response)=>{
        console.log("file upload response"+res);
      })
      this.userDeatilsObj={
        "UserName":this.userDeatilsObj.UserName,
        "PassWord":this.userDeatilsObj.PassWord,
        "MobileNo": this.userDeatilsObj.MobileNo,
        "Email": this.userDeatilsObj.Email,
        "OfficeId": officeId,
        "role": 'office'
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

  onFileChange(event) {
    let reader = new FileReader();
    this.logo =event.target.files[0];
    //var files = event.srcElement.files;
    var target = event.target || event.srcElement;
     var files = target.files;
  }
  clearFile() {
    this.logo=null;
   // this.fileInput.nativeElement.value = '';
  }

}
