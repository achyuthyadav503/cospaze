import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';

@Component({
  selector: 'app-officedetails',
  templateUrl: './officedetails.component.html',
  styleUrls: ['./officedetails.component.css']
})
export class OfficeDetailsComponent implements OnInit {

  constructor(private http:Http) { }

  textpattern="^[a-zA-Z\\s]+$";
  searchDeatilsObj:object=[];
  list = [];
  data;
  cities=[];
  loctaions=[];
  loctaionsByCity=[];

  ngOnInit() {
    
    this.http.get("/CoAPI/office-details.php").
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
      "typesOfSeats":search.typesOfSeats
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
  updateLocations=function(City){
    // console.log(City);
     //console.log(this.loctaions)
     this.loctaionsByCity=this.loctaions[City];
     console.log(this.loctaionsByCity);
   }
 

}
