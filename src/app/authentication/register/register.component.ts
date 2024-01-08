import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY',
},
};
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class RegisterComponent  {
  register: UntypedFormGroup;
  hide = true;
  addresses:any;
  nationalities:any;
  constructor(private fb: UntypedFormBuilder,public datepipe: DatePipe,private data: AuthService,private route:Router) {
    this.Form();
  }

  ngOnInit(): void {
    this.fillSelect();
    }

  Form() {
    this.register = this.fb.group({
      
      SSN: ["", [Validators.required]],
      email: ["", [Validators.required,Validators.email, Validators.minLength(5)]],
      balance: [1000],
      first_name: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      last_name:  ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      password:  ["", [Validators.required]],
      DOB: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      passport_file: [null],
      address_zip_code: ["", [Validators.required]],
      nationality_country_code: ["", [Validators.required]],

    });
  }

  fillSelect(){
    this.data.getAddresses().subscribe(
      (result: any) => {
        this.addresses = result;
      })    
    
    this.data.getNationalities().subscribe(
      (result: any) => {
        this.nationalities = result;
      })   
  }

  onRegister() {
    var date=this.register.controls["DOB"].getRawValue().toDateString();
    
    this.register.controls["DOB"].setValue(date);
    this.register.controls["SSN"].setValue(Number(this.register.controls["SSN"].getRawValue()));
    this.register.controls["balance"].setValue(1000);
    this.register.controls["DOB"].setValue(this.datepipe.transform(this.register.controls["DOB"].getRawValue(), 'yyyy-MM-dd'));

    


    const formData = new FormData();
    formData.append('SSN', this.register.controls["SSN"].getRawValue());
    formData.append('email', this.register.controls["email"].getRawValue());
    formData.append('balance', this.register.controls["balance"].getRawValue());
    formData.append('first_name', this.register.controls["first_name"].getRawValue());
    formData.append('last_name', this.register.controls["last_name"].getRawValue());
    formData.append('password', this.register.controls["password"].getRawValue());
    formData.append('DOB', this.register.controls["DOB"].getRawValue());
    formData.append('gender', this.register.controls["gender"].getRawValue());
    formData.append('passport_file', this.register.controls["passport_file"].getRawValue());
    formData.append('address_zip_code', this.register.controls["address_zip_code"].getRawValue());
    formData.append('nationality_country_code', this.register.controls["nationality_country_code"].getRawValue());
   



    this.data.createUser(formData).subscribe(
      error => {
        alert(error);
    
        this.route.navigate(['authentication'])
         }
          )
    this.register.reset();
    Object.keys(this.register.controls).forEach(key => {
      this.register.get(key).setErrors(null) ;
    });
    
  }

  myForm: FormGroup;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.register.controls["passport_file"].setValue(file);

    }
    else{
      
    }
  }
}
