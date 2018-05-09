import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';
import { CompleterService, CompleterData } from 'ng2-completer';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  
})
export class RegistrationComponent implements OnInit {
 @ViewChild('fileInput') fileInput: ElementRef;
 @ViewChild('officeImages') officeImages: ElementRef;
 @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  searchStr: string;
 dataService: CompleterData;
  constructor(private http:Http,private router: Router,private completerService: CompleterService) {
     this.dataService = completerService.local(this.loctaionsByCity, 'id', 'location');
   }
   
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
  tLoctaions=[];
  loctaionsByCity=[];
  officeAmenitiesObj:object=[];
  amenities:object[]=[];
  officeImagesObj:object=[];
  images:object[]=[];
  officeImageFiles:object[]=[];
  logo;
  lat;
  lng;
  location;
  city;
 // protected dataService: CompleterData;
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

    this.officeImagesObj ={
      "officeImages":""
    }

    this.images.push(this.officeImagesObj);
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
  addImages= function(user){
    this.officeImagesObj ={
      "officeImages":""
    }

    this.images.push(this.officeImagesObj);
  }
  deleteType=function (i){
   this.types.splice(i, 1);
  }
  deleteAmenities = function(i){
     this.amenities.splice(i, 1);
  }
  deleteImages = function(i){
    this.images.splice(i, 1);
 }
  addNewUser=function (regform) {

    let fi = this.fileInput.nativeElement;
    let fileToUpload = fi.files[0];
    this.input = new FormData();
    this.input.append("file", fileToUpload);
    let headers = new Headers();

    let officeFiles = this.officeImages.nativeElement;
    for (let officeFile of officeFiles.files) {
    this.input.append("officeFiles[]", officeFile);
    }

    let user=regform.value;
    console.log('click add');
    this.OfficeDetailsObj={
      "":user.id,
      "OfficeName":user.OfficeName,
      "Address":user.Address,
       "Description": user.Description,
       "typesofseats":this.types,
       "amenities":this.amenities,
       "images":this.images,
       "lat":this.lat,
       "lng":this.lng,
       "Location":this.location,
       "City":this.city,
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
  public handleAddressChange(address) {
    // Do some stuff
  
  // console.log(address.address_components[0].short_name);
   //console.log(address.address_components[1].short_name);
    //console.log(address.geometry.location);
    //console.log(address.geometry.location.lat());
    //console.log(address.geometry.location.lng());

  this.lat=address.geometry.location.lat();
  this.lng=address.geometry.location.lng();
  this.location=address.address_components[0].short_name;
  this.city=address.address_components[1].short_name;
  
}
  reset=function (Form) {
    Form.reset();
  }
  updateLocations=function(City){
    console.log(City);
    console.log(this.loctaions);
    if(City!='')
    this.loctaionsByCity=this.loctaions[City];


for (let entry of this.loctaionsByCity) {
  
    let loc ={
        "location":entry.location,
        "value":entry.id,
      }
      this.tLoctaions.push(loc);
}

     this.dataService = this.completerService.local(this.tLoctaions, 'location', 'location');
  }

  onFileChange(event) {
   // let reader = new FileReader();
   // this.logo =event.target.files[0];
    //var files = event.srcElement.files;
    var target = event.target || event.srcElement;
     var logo = target.files;

  }
  addOfficeImages(event) {
    // let reader = new FileReader();
    // this.logo =event.target.files[0];
     //var files = event.srcElement.files;
     var target = event.target || event.srcElement;
      this.officeImageFiles.push(target.files[0]);
      
   }
  clearFile() {
    this.logo=null;
   // this.fileInput.nativeElement.value = '';
  }
  

}
