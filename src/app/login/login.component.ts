import { Component, OnInit } from '@angular/core';
import {Http}from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:Http,private router: Router) { }

  ngOnInit() {
  }
  validateUser(user){
    var x= this.http.get("http://localhost:5555/userdetails");
    x.subscribe(
       (item)=>{
        
         let user_data = item.json();
         console.log("form user name"+user.UserName);
         user_data.forEach(element => {
           console.log("user name"+element.UserName);
           if(element.UserName===user.UserName || "admin"===user.UserName){
            localStorage.setItem("userdata", JSON.stringify(element));
             this.router.navigateByUrl("/home");
           }
           
         });
        });
     } 

}
