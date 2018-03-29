import { Component, OnInit } from '@angular/core';
import {Http}from '@angular/http';

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

  ngOnInit() {
  }

  search=function (search) {

    this.searchDeatilsObj={
      "location":search.Location,
      "NoSeats" :search.NoSeats
    }
    console.log("in search");
    console.log(this.searchDeatilsObj);
    this.http.post("/CoAPI/search.php",this.searchDeatilsObj).
    subscribe((res:Response)=>{
      console.log('response');
      
     let data = res.json();
      //this.list = data.list;
      console.log(this.list);
    })

  }

}
