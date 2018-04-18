import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-compregistration',
  templateUrl: './compregistration.component.html',
  styleUrls: ['./compregistration.component.css']
})
export class CompregistrationComponent implements OnInit {
form: FormGroup;
  loading: boolean = false;
  
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(private http:Http,private router: Router) { }

  

  conformationString:string="New Company details has been added";
  emailPattern ="^\\w+([\\.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,3})+$";
  textpattern="^[a-zA-Z\\s]+$";
  mobilepattern="^[2-9]{2}[0-9]{8}$";
  isAdded:boolean=false;
  compDetailsObj:object=[];
  userDeatilsObj:object=[];
  typesOfSeats:object=[];
  Numberofseats:object=[];
  typesOfSeatsObj;
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
  logo;
   CompanyType = 'Company';
   rowcount=1;
   count=[this.rowcount]; 

  ngOnInit() {

   /* this.datepickerOptions = new DatePickerOptions({
    format: 'DD-MM-YYYY'
});*/
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
    
   let data = res.json();
    this.offices = data.list;
  });
  this.typesOfSeatsObj={
    "typesOfSeats":'',
    "numberofseats":0
   // "Priceperseat":user.Priceperseat
    }
    this.types.push(this.typesOfSeatsObj);
    }else{
      this.router.navigateByUrl("errorpage");
     }
  }
  addData=function (kaspy) {
   
    this.typesOfSeatsObj={
    "typesOfSeats":'',
    "numberofseats":'',
   // "Priceperseat":user.Priceperseat
    }
    this.types.push(this.typesOfSeatsObj);

  }
 
  deleteType=function (i){
  // let id=typeOf.id;
  // this.types = this.types.filter(typesOfSeatsObj => typesOfSeatsObj.id !== id);
  // delete[this.types.indexOf(typeOf)];
 this.types.splice(i, 1);
  }
  addNewComp=function (companyForm) {
    let company=companyForm.value;
    let companyId = this.loginObj.companyId; //will get from session
    let officeId = this.loginObj.officeId; //will get from session
    if(this.isAdmin)
     officeId = company.Office;
   
   /*  this.typesOfSeatsObj={
      "typesOfSeats":company.typesOfSeats,
      "numberofseats":company.Numberofseats
     // "Priceperseat":user.Priceperseat
      }
      this.types.push(this.typesOfSeatsObj); 
      */

    let name = company.FullName;
    let companyName = company.CompanyName;
    let companyType = company.CompanyType;
    if(companyType=='Freelancer')
      companyName = name;
    else
      name = company.UserName;
    this.compDetailsObj={
      "CompanyType":company.CompanyType,
      "CompanyName":companyName,
      "typesofseats":this.types,
      "joiningDate":company.joiningDate,
      "Tmrent": company.Tmrent,
      "Description": company.description,
      "officeId" : officeId,
      "logo":this.logo.name,
    }
    this.userDeatilsObj={
      "UserName":name,
      "PassWord":company.PassWord,
      "MobileNo": company.MobileNo,
      "Email": company.perEmail
    }
      let headers = new Headers({
        'Content-Type': 'multipart/form-data'
    });

/* let inputEl = this.fileInput.nativeElement;
let fileCount: number = inputEl.files.length;
let formData = new FormData();
        if (fileCount > 0) { // a file was selected
            for (let i = 0; i < fileCount; i++) {
                formData.append('file[]', inputEl.files.item(i));
            }*/

    this.http.post("/CoAPI/register-company.php",this.compDetailsObj,headers).
    subscribe((res:Response)=>{
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
     this.isAdded=true;
     companyForm.reset();
    // this.router.navigateByUrl("/home");
    })
    })
  }
  reset=function (Form) {
    Form.reset();
  }

  onFileChange(event) {
    let reader = new FileReader();
    this.logo=event.target.files[0];
    var files = event.srcElement.files;
    /*if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('logo').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
    if(event.target.files.length > 0) {
      let file = event.target.files[0];
      this.logo=file;
      
    }*/
  }
  clearFile() {
    this.logo=null;
    this.fileInput.nativeElement.value = '';
  }

}
