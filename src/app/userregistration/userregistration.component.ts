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
  isAdmin:boolean=false;
  
  userDeatilsObj:object=[];
  loginObj:object=[];
  typesOfSeatsObj:object=[];
  types:object[]=[];
  userDetailsObj;
  officeDetails;
  islogedin:boolean=false;
  isOffice:boolean=false;
  isCompany:boolean=false;
  role:String;
  offices=[];
  companies=[];
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
     this.http.post("/CoAPI/search.php",{}).
      subscribe((res:Response)=>{
        console.log('response catalogue');
        
      let data = res.json();
      console.log(data);
        this.offices = data.list;
        console.log(this.offices);
      });
      if(this.isAdmin)
      this.officeDetails = {};
      else
      this.officeDetails = {'office':this.userDetailsObj.officeId};
       this.http.post("/CoAPI/company-list.php",this.officeDetails).
      subscribe((res:Response)=>{
        console.log('response catalogue');
        
      let data = res.json();
      console.log(data);
        this.companies = data.companyList;
        //console.log(this.offices);
      });
    }else{
      this.router.navigateByUrl("errorpage");
     }
  }

   updateCompanies=function(office){
    console.log(office);
    if(this.isAdmin)
      this.officeDetails = {'office':office};
      else
      this.officeDetails = {'office':this.loginObj.officeId};

       this.http.post("/CoAPI/company-list.php",this.officeDetails).
      subscribe((res:Response)=>{
        console.log(res);
        
      let data = res.json();
     // console.log(data);
        this.companies = data.companyList;
       // console.log(this.offices);
      });
  }
 
  addNewUser=function (userform) {
    let user=userform.value;
    let companyId = this.loginObj.companyId; //will get from session
    let officeId = this.loginObj.officeId; //will get from session
    if(this.isAdmin){
      officeId=user.Office;
    }
    if(this.isOffice){
      companyId=user.Company;
    }

    this.userDeatilsObj={
      "UserName":user.FullName,
      "PassWord":user.PassWord,
      "MobileNo": user.MobileNo,
      "Email": user.Email,
      "companyId": companyId,
      "officeId": officeId,
      "role": 'employee'
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
