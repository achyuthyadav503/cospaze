import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-suggestion-list',
  templateUrl: './suggestion-list.component.html',
  styleUrls: ['./suggestion-list.component.css']
})
export class SuggestionListComponent implements OnInit {

 constructor(private http:Http,private router: Router) { }

 
  conformationString:string="New Employee has been added";
  emailPattern ="^\\w+([\\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$";
  textpattern="^[a-zA-Z\\s]+$";
  mobilepattern="^[2-9]{2}[0-9]{8}$";
  isAdded:boolean=false;
  isAdmin:boolean=false;
   userDetailsObj;
  loginObj:object=[];
 islogedin:boolean=false;
  isOffice:boolean=false;
  isCompany:boolean=false;
  role:String;
  suggestionList;
  messages;
  ngOnInit() {
    this.loginObj=JSON.parse(localStorage.getItem("userdata"));
    this.userDetailsObj=JSON.parse(localStorage.getItem("userdata"));
    console.log("user name "+this.userDetailsObj.name);
   if(this.userDetailsObj!= null){
    this.islogedin=true;
    this.role=this.userDetailsObj.role;
    if(this.role=='admin'){
      this.isAdmin = true;
      this.isOffice = true;
      this.isCompany = true;
    }
    if(this.role=='office'){
      this.isOffice = true;
      this.isCompany = true;
    }
      if(this.isAdmin)
      this.suggestionList = {};
      else
      this.suggestionList = {'user':this.userDetailsObj.userId};
       this.http.post("/CoAPI/suggestion-list.php",this.suggestionList).
      subscribe((res:Response)=>{
        console.log('response catalogue');
        
      let data = res.json();
      console.log(data);
        this.messages = data.suggestionList;
        //console.log(this.offices);
      });
    }else{
      this.router.navigateByUrl("errorpage");
     }
  }

}
