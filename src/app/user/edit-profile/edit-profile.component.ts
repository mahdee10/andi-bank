import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  updateUser!: UntypedFormGroup;
  updateUser2!: UntypedFormGroup;
  nationalities: any;
  addresses: any;
  hide = true;
  name: any;
  constructor(private url: ActivatedRoute, private fb: UntypedFormBuilder, private user: DataService, private router: Router, public datepipe: DatePipe) {
    this.Form();
  }
  ssn: any;
  ngOnInit() {
    if (localStorage.getItem("role") == "user") { }
    else {
      this.router.navigate(['/authentication/login'])
    }
    this.updateUser.controls["password"].setValue(localStorage.getItem("b"))
    this.ssn = this.url.snapshot.params['id'];
    if (this.ssn > 0) {
      this.user.getUser().subscribe(

        (result: any) => {
          this.updateUser.controls["address_zip_code"].setValue(result.address.zip_code)
          this.name = result.name.split(' ');
          this.updateUser.controls["first_name"].setValue(this.name[0])
          this.updateUser.controls["last_name"].setValue(this.name[1])
          this.updateUser.patchValue(result);
        }

      )
    }
    this.fillSelect();
  }

  fillSelect() {
    this.user.getAddresses().subscribe(
      (result: any) => {
        this.addresses = result;
      })

    this.user.getNationalities().subscribe(
      (result: any) => {
        this.nationalities = result;
      })
  }
  Form() {

    this.updateUser = this.fb.group({
      SSN: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      balance: ["", [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      passport_file: ["", [Validators.required]],
      address: ["", [Validators.required]],
      nationality: ["", [Validators.required]],
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      address_zip_code: ["", [Validators.required]],
      password: [Number(localStorage.getItem("b")), [Validators.required]],
    })
    this.updateUser2 = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
      address_zip_code: ["", [Validators.required]],
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
    })

  }

  onRegister() {
    this.updateUser2.controls["email"].setValue(this.updateUser.controls["email"].getRawValue())
    this.updateUser2.controls["first_name"].setValue(this.updateUser.controls["first_name"].getRawValue())
    this.updateUser2.controls["last_name"].setValue(this.updateUser.controls["last_name"].getRawValue())
    this.updateUser2.controls["password"].setValue(this.updateUser.controls["password"].getRawValue())
    this.updateUser2.controls["address_zip_code"].setValue(this.updateUser.controls["address_zip_code"].getRawValue())
    localStorage.setItem("b", this.updateUser2.controls["password"].getRawValue());
    this.user.updateUser(this.ssn, this.updateUser2.value).subscribe(


    )
    alert("Updated Successfully")
    this.router.navigate(['user/transaction'])

  }
}
