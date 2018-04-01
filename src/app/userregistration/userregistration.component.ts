import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';
@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent implements OnInit {

  constructor(private http:Http,private router: Router) { }

 
  conformationString:string="New Employee has been added";
  emailPattern ="^\\w+([\\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$";
  textpattern="^[a-zA-Z\\s]+$";
  mobilepattern="^[2-9]{2}[0-9]{8}$";
  isAdded:boolean=false;
  
  userDeatilsObj:object=[];
  typesOfSeatsObj:object=[];
  types:object[]=[];
  
  ngOnInit() {
  }
 
  addNewUser=function (userform) {
    let user=userform.value;
    let companyId = null; //will get from session
    this.userDeatilsObj={
      "UserName":user.FullName,
      "PassWord":user.PassWord,
      "MobileNo": user.MobileNo,
      "Email": user.Email,
      "companyId": companyId
    }
    console.log(this.userDeatilsObj);
    this.http.post("/CoAPI/register-employee.php",this.userDeatilsObj).
    subscribe((res:Response)=>{
		console.log(res);
     this.isAdded=true;
     userform.reset();
    // this.router.navigateByUrl("/home");
    })
  }
  reset=function (Form) {
    Form.reset();
  }
}
