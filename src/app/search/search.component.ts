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

  ngOnInit() {
  }

  search=function (search) {

    this.searchDeatilsObj={
      "location":search.Location,
      "NoSeats" :search.NoSeats
    }
    console.log("in search");
    console.log(this.searchDeatilsObj);
    this.http.post("http://localhost/search",this.searchDeatilsObj).
    subscribe((res:Response)=>{
      console.log('response');
      console.log(res);
    })

  }

}
