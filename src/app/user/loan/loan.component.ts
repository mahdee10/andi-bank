import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Loan } from './loan';
import { User } from '../user';
import { DatePipe } from '@angular/common';
import { atLeastOne } from './atleast';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent {
  person: User | null;
  loans: Loan | any;
  createLoan!: UntypedFormGroup;
  createLoan2!: UntypedFormGroup;
  today: any;
  hidden = false;

  constructor(private router: Router, private fb: UntypedFormBuilder, private user: DataService, public datepipe: DatePipe) {
    this.Form();
  }
  ngOnInit() {
    if (localStorage.getItem("role") == "user") { }
    else {
      this.router.navigate(['/authentication/login'])
    }

    if (this.hidden) {
      this.createLoan.enable();
    }




    this.user.getLoan().subscribe(
      (result: any) => {
        this.loans = result;
        if (!this.check()) {
          this.createLoan.disable();
        }
      });
  }

  Form() {
    this.createLoan = this.fb.group({
      amount: ["", [Validators.required]],
      month: [""],
      year: [""],
    }, { validator: atLeastOne(Validators.required, ['year', 'month']) });

    this.createLoan2 = this.fb.group({
      duration: [""],
      amount: [""],
      date: [this.today],
      status: [2],
      a_id: [10],
      u_SSN: [Number(localStorage.getItem("a"))],
      // a_id: [10],

    });

  }


  onRegister() {
    this.today = new Date();
    this.today = this.datepipe.transform(this.today, 'yyyy-MM-dd');
    this.createLoan2.controls["date"].setValue(this.today)
    this.createLoan2.controls["amount"].setValue(Number(this.createLoan.controls["amount"].getRawValue()))

    if (this.createLoan.controls["month"].getRawValue() == "") {
      this.createLoan2.controls["duration"].setValue(this.createLoan.controls["year"].getRawValue() + " year")
    }
    else if (this.createLoan.controls["year"].getRawValue() == "") {
      this.createLoan2.controls["duration"].setValue(this.createLoan.controls["month"].getRawValue() + " month")
    }
    else {
      this.createLoan2.controls["duration"].setValue(this.createLoan.controls["year"].getRawValue() + " year , " + this.createLoan.controls["month"].getRawValue() + " month")
    }
    this.user.createLoan(this.createLoan2.value).subscribe(
      error => {
        alert("Loan requested successfully")
      }
    )
    this.createLoan.reset();
    Object.keys(this.createLoan.controls).forEach(key => {
      this.createLoan.get(key).setErrors(null);
      this.ngOnInit();
      this.check();
    });
  }


  check() {
    for (let i = 0; i < this.loans.length; i++) {
      if (this.loans[i].status == 2) {
        this.hidden = true;
        return false;
      }
    }
    this.hidden = false;
    return true;
  }

}
