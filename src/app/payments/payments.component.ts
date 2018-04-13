import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private http:Http,private router: Router) { }
  conformationString:string="payment details added successful";
  textpattern="^[a-zA-Z\\s]+$";
  isAdded:boolean=false;
  isAdmin:boolean=false;
  loginObj:object=[];
  userDetailsObj;
  officeDetails;
  paymentDetailsObj;
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
  pay = function (payment) {
    let paymentData=payment.value;
    this.paymentDetailsObj={ 
		"Office": paymentData.Office,
		"Company":paymentData.Company,
		"Amountpaid":paymentData.Amountpaid,
		"dateOfPayment":paymentData.dateOfPayment,
		"modeOfPayment":paymentData.modeOfPayment,
		"TransCheqNO":paymentData.TransCheqNO
    }
    console.log(this.paymentDetailsObj);
    this.http.post("/CoAPI/payment.php",this.paymentDetailsObj).
    subscribe((res:Response)=>{
		console.log(res);
     this.isAdded=true;
     payment.value.Office=null;
     payment.value.Company=null;
     payment.value.modeOfPayment=null;
     payment.reset();
    // this.router.navigateByUrl("/home");
    })

  }
  reset=function (Form) {
    Form.value.Office=null;
    Form.value.Company=null;
    Form.value.modeOfPayment=null;
    Form.reset();
  }

}
