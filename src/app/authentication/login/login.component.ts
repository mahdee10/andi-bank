import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Respons } from '../response';
import { DataService } from 'src/app/user/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  login: any;
  constructor(private fb: UntypedFormBuilder,private data: AuthService,private router:Router,private user:DataService) {
  }
  ngOnInit(): void {
    this.Form();
  }

  Form() {
    this.login = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)])
      });
  }

  response:any;
  onSubmit(){

    this.data.login(this.login.value).subscribe(
      (response) => {
         localStorage.setItem("b",this.login.controls["password"].getRawValue());
         this.response=response.body;
         this.data.onlogin(response.body["SSN"]);

         
        localStorage.setItem("role",response.body["role"]);
          if(response.body["role"]=="user"){

          
          this.router.navigate(['user/transaction'])
          this.data.getUser(response.body["SSN"]).subscribe(
            (result: any) => {
              localStorage.setItem("c",result.name);
              localStorage.setItem("email",result.email);
              localStorage.setItem("balance",result.balance);
              localStorage.setItem("ssn",response.body["SSN"]);
  
            });
        }
        else{
         this.data.onlogin(response.body["a_id"]);

          this.data.getAdmin(response.body["a_id"]).subscribe(
            (result: any) => {
              localStorage.setItem("c",result.name);
              localStorage.setItem("email",result.email);
  
            });
          this.router.navigate(['admin/address'])
  
         }
      }
           );

     Object.keys(this.login.controls).forEach(key => {
       this.login.get(key).setErrors(null) ;
     });
  }
}
