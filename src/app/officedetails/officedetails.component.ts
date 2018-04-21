import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-officedetails',
  templateUrl: './officedetails.component.html',
  styleUrls: ['./officedetails.component.css']
})
export class OfficeDetailsComponent implements OnInit {

  constructor(private http:Http,private route: ActivatedRoute,
    private router: Router) { }

  textpattern="^[a-zA-Z\\s]+$";
  officeInput:object=[];
  list = [];
  data;
  cities=[];
  loctaions=[];
  loctaionsByCity=[];
  office;
 input;

  ngOnInit() {

this.input = this.route.params.subscribe(params => {
     // PARAMS CHANGED .. TO SOMETHING REALLY COOL HERE ..

     // for example extract the id..
     let id = +params['officeId']; // (+) converts string 'id' to a number

   });


    this.officeInput={
      "officeId":1,
    }

     /*let headers = new Headers();
        this.input = new FormData();
    this.input.append("officeId", 1);*/
    //this.http.get("/CoAPI/office-details.php",this.input, { headers: headers, method: 'POST'}).subscribe((res:Response)=>{
    this.http.get("/CoAPI/office-details.php?officeId=1",this.officeInput).subscribe((res:Response)=>{
    console.log('response catalogue');
    
   let data1 = res.json();
   console.log(data1);
    this.office = data1.office;
   

  })
  }

}
