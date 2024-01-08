import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-prediction',
  templateUrl: './loan-prediction.component.html',
  styleUrls: ['./loan-prediction.component.css']
})
export class LoanPredictionComponent {
  key_profession: any;
  key_city: any;
  key_state: any;
  profession: any;
  city: any;
  state: any;
  createPredict: UntypedFormGroup;

  good = false;
  bad = false;
  hide = false;
  title = false;

  ngOnInit() {
    if (localStorage.getItem("role") == "user") { }
    else {
      this.router.navigate(['/authentication/login'])
    }
    this.getData();
  }

  constructor(private data: DataService, private fb: UntypedFormBuilder, private router: Router) {
    this.Form()
  }
  getData() {
    this.data.getFeatures(1).subscribe(
      (result: any) => {

        this.profession = result;
        this.key_profession = Object.keys(this.profession);

      })

    this.data.getFeatures(2).subscribe(
      (result: any) => {

        this.city = result;
        this.key_city = Object.keys(this.city);


      })

    this.data.getFeatures(3).subscribe(
      (result: any) => {

        this.state = result;
        this.key_state = Object.keys(this.state);


      })
  }

  Form() {
    this.createPredict = this.fb.group({
      income: ["", [Validators.required]],
      age: ["", [Validators.required]],
      experience: ["", [Validators.required]],

      is_married: ["", [Validators.required]],
      is_house_owner: ["", [Validators.required]],
      is_car_owner: ["", [Validators.required]],

      profession_num: ["", [Validators.required]],
      city_num: ["", [Validators.required]],
      state_num: ["", [Validators.required]],

      current_job_year: ["", [Validators.required]],
      current_house_year: ["", [Validators.required]],
    });


  }
  onRegister() {
    this.hide = true;
    this.title = true;

    this.createPredict.controls["income"].setValue(Number(this.createPredict.controls["income"].getRawValue()));
    this.createPredict.controls["experience"].setValue(Number(this.createPredict.controls["experience"].getRawValue()));
    this.createPredict.controls["age"].setValue(Number(this.createPredict.controls["age"].getRawValue()));
    this.createPredict.controls["city_num"].setValue(Number(this.createPredict.controls["city_num"].getRawValue()));
    this.createPredict.controls["profession_num"].setValue(Number(this.createPredict.controls["profession_num"].getRawValue()));
    this.createPredict.controls["state_num"].setValue(Number(this.createPredict.controls["state_num"].getRawValue()));
    this.createPredict.controls["current_job_year"].setValue(Number(this.createPredict.controls["current_job_year"].getRawValue()));
    this.createPredict.controls["current_house_year"].setValue(Number(this.createPredict.controls["current_house_year"].getRawValue()));

    this.data.createPredict(this.createPredict.value).subscribe(
      (response) => {

        if (response.body["Decision"] == true) {
          this.bad = true;

        }
        else {
          this.good = true;
        }
        this.hide = false

      }
    )
    this.createPredict.disable();
    this.createPredict.reset();
    Object.keys(this.createPredict.controls).forEach(key => {
      this.createPredict.get(key).setErrors(null);
    });
  }
}
