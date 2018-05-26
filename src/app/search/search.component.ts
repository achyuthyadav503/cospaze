import { Component, OnInit,ViewChild, } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';
import{OfficeInfoService} from './../shared/officeInfo/office-info.service';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']

})
export class SearchComponent implements OnInit {
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  constructor(private http:Http,private router: Router,private officeinfo:OfficeInfoService) { }

  textpattern="^[a-zA-Z\\s]+$";
  searchDeatilsObj:object=[];
  list = [];
  data;
  cities=[];
  loctaions=[];
  loctaionsByCity=[];
  lat;
  lng;

  ngOnInit() {
    
    this.http.get("/CoAPI/catalouge-list.php").
  subscribe((res:Response)=>{
    console.log('response catalogue');
    
   let data1 = res.json();
   console.log(data1);
    this.cities = data1.cityList;
    this.loctaions=data1.locationList;
   
    console.log(this.cities);

    this.searchDeatilsObj={
      "City":1,
      "location":1,
       "NoSeats" :"",
      "typesOfSeats":""
      
     
    }
    console.log("in search");
    console.log(this.searchDeatilsObj);
    this.http.post("/CoAPI/search.php",this.searchDeatilsObj).
    subscribe((res:Response)=>{
      console.log('response'+res);
     this.data = res.json();
    this.list = this.data.list;
      console.log(this.data);
    })
  })
  }

  search=function (search) {

    this.searchDeatilsObj={
      "City":search.City,
      "location":search.Location,
      "NoSeats" :search.NoSeats,
      "typesOfSeats":search.typesOfSeats,
      "lat":this.lat,
      "lng":this.lng,
    }
    console.log("in search");
    console.log(this.searchDeatilsObj);
    this.http.post("/CoAPI/search.php",this.searchDeatilsObj).
    subscribe((res:Response)=>{
      console.log('response');
      
     this.data = res.json();
      this.list = this.data.list;
      console.log(this.list);
    })

  }
  public handleAddressChange(address) {
    // Do some stuff
   
   // console.log(address);
    //console.log(address.geometry.location);
    //console.log(address.geometry.location.lat());
   // console.log(address.geometry.location.lng());

  this.lat=address.geometry.location.lat();
  this.lng=address.geometry.location.lng();
}
  updateLocations=function(City){
    // console.log(City);
     //console.log(this.loctaions)
     this.loctaionsByCity=this.loctaions[City];
     console.log(this.loctaionsByCity);
   }

   officeDetails = function(officeId){
    
   this.officeinfo.id=officeId;
     /* this.userinfo.ChatUser=data;
   this.userinfo.id=id;*/
   //localStorage.setItem("chatuserinfo", JSON.stringify(this.userinfo));
   this.router.navigate(['/office-details/'+officeId]);
  // this.router.navigate(['/office-details/']);
   }
 

}
