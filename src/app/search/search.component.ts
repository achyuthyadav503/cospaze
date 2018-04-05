import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private http:Http) { }

  textpattern="^[a-zA-Z\\s]+$";
  searchDeatilsObj:object=[];
  list = [];
  data=JSON;
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
