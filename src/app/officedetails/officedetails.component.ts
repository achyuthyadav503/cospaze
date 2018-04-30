import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import{OfficeInfoService} from './../shared/officeInfo/office-info.service';
@Component({
  selector: 'app-officedetails',
  templateUrl: './officedetails.component.html',
  styleUrls: ['./officedetails.component.css']
})
export class OfficeDetailsComponent implements OnInit {

 textpattern="^[a-zA-Z\\s]+$";
  officeInput:object=[];
  list = [];
  data;
  cities=[];
  loctaions=[];
  loctaionsByCity=[];
  office;
 input;
  constructor(private http:Http,private route: ActivatedRoute,private router: Router,private officeinfo:OfficeInfoService) {
   this.route.params.subscribe( params =>
    //console.log(params);
    this.office = params.id
     );  
   }

 

  ngOnInit() {

//this.office = this.officeinfo.id;
    this.officeInput={
      "officeId":1,
    }

     /*let headers = new Headers();
        this.input = new FormData();
    this.input.append("officeId", 1);*/
    //this.http.get("/CoAPI/office-details.php",this.input, { headers: headers, method: 'POST'}).subscribe((res:Response)=>{
    this.http.get("/CoAPI/office-details.php?officeId="+this.office).subscribe((res:Response)=>{
    console.log('response catalogue');
    
   let data1 = res.json();
   console.log(data1);
    this.office = data1.office;
   

  })
  }

}
