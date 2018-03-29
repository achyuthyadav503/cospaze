import { Component, OnInit } from '@angular/core';
import {Http,Response,Headers}from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:Http,private router: Router) { }
  userDeatilsObj:object=[];

  ngOnInit() {
  }


  validateUser(user){
    this.userDeatilsObj={
      "UserName":user.UserName,
      "PassWord":user.password
    }

    console.log(this.userDeatilsObj);

    this.http.post("/CoAPI/login.php",this.userDeatilsObj).subscribe((res:Response)=>{

      
      //console.log(res.json());
      let data = res.json();
      //let k = JSON.parse(data);
     // console.log("form user name"+data);
    //  console.log("form user name"+k);
      let userData = data.details;
     // console.log("form user name"+user.UserName);
      //console.log("form user name"+userData.name);
      localStorage.setItem("userdata", JSON.stringify(userData));
      this.router.navigateByUrl("/home");

    })
       

     
     } 

}
