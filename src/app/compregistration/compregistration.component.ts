import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-compregistration',
  templateUrl: './compregistration.component.html',
  styleUrls: ['./compregistration.component.css']
})
export class CompregistrationComponent implements OnInit {

  constructor(private http:Http,private router: Router) { }

  

  conformationString:string="New Company details has been added";
  emailPattern ="^\\w+([\\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$";
  textpattern="^[a-zA-Z\\s]+$";
  mobilepattern="^[2-9]{2}[0-9]{8}$";
  isAdded:boolean=false;
  compDetailsObj:object=[];
  userDeatilsObj:object=[];
  typesOfSeatsObj:object=[];
  types:object[]=[];
  loginObj:object=[];
  today:Date=new Date();
  userDetailsObj;
  isAdmin:boolean=false;
  islogedin:boolean=false;
  isOffice:boolean=false;
  isCompany:boolean=false;
  isnewCompany:boolean=false;
  isFreelancer:boolean=false;
  role:String;
  offices=[];
  
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
     this.http.post("/CoAPI/search.php",{}).
  subscribe((res:Response)=>{
    console.log('response catalogue');
    
   let data = res.json();
   console.log(data);
    this.offices = data.list;
    console.log(this.offices);
  });
    }else{
      this.router.navigateByUrl("errorpage");
     }
  }
  addData=function (user) {

    this.typesOfSeatsObj={
    "typesOfSeats":user.typesOfSeats,
    "Numberofseats":user.Numberofseats
   // "Priceperseat":user.Priceperseat
    }
    this.types.push(this.typesOfSeatsObj);
  }
  deleteType=function (i){
   // let id=typeOf.id;
   // this.types = this.types.filter(typesOfSeatsObj => typesOfSeatsObj.id !== id);
   //delete[this.types.indexOf(typeOf)];
   console.log("entry");
   console.log(i);
   this.types.splice(i, 1);
  }
  addNewComp=function (companyForm) {
    let company=companyForm.value;
    let companyId = this.loginObj.companyId; //will get from session
    let officeId = this.loginObj.officeId; //will get from session
    if(this.isAdmin)
     officeId = company.Office;
    this.compDetailsObj={
      "CompanyType":company.CompanyType,
      "CompanyName":company.CompanyName,
      "typesofseats":this.typesOfSeatsObj,
      "joiningDate":company.joiningDate,
      "Tmrent": company.Tmrent,
      "Description": company.description,
      "officeId" : officeId,
      
    }
    this.userDeatilsObj={
      "UserName":company.UserName,
      "PassWord":company.PassWord,
      "MobileNo": company.MobileNo,
      "Email": company.perEmail
    }
    this.http.post("/CoAPI/register-company.php",this.compDetailsObj).
    subscribe((res:Response)=>{
      console.log(res);
      let data = res.json();
      let officeData = data.details;
      let companyId = officeData.companyId;
      this.userDeatilsObj={
        "UserName":this.userDeatilsObj.UserName,
        "PassWord":this.userDeatilsObj.PassWord,
        "MobileNo": this.userDeatilsObj.MobileNo,
        "Email": this.userDeatilsObj.Email,
        "companyId": companyId,
        "officeId" : officeId,
        "role": 'company'
      }
      this.http.post("/CoAPI/register-employee.php",this.userDeatilsObj).
    subscribe((res:Response)=>{
		console.log(res);
     this.isAdded=true;
     companyForm.reset();
    // this.router.navigateByUrl("/home");
    })
    })
  }
  reset=function (Form) {
    Form.reset();
  }

}
