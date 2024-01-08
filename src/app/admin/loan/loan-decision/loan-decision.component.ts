import { Component } from '@angular/core';
import { AdminServiceService } from '../../admin-service.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PassportComponent } from './passport/passport.component';

@Component({
  selector: 'app-loan-decision',
  templateUrl: './loan-decision.component.html',
  styleUrls: ['./loan-decision.component.css']
})
export class LoanDecisionComponent {
  constructor(private url: ActivatedRoute, private fb: UntypedFormBuilder, private data: AdminServiceService, private router: Router, private dialog: MatDialog) {
    this.Form();
  }

  Form() {
    this.updateLoan = this.fb.group({

      status: ["", [Validators.required]],
      a_id: [Number(localStorage.getItem("a"))]
    });
    this.updateUser = this.fb.group({

      balance: [""],


    });


  }
  updateLoan!: UntypedFormGroup;
  updateUser!: UntypedFormGroup;

  loanNumber: any;
  ssn: any;
  ngOnInit() {
    if (localStorage.getItem("role") == "admin") { }
    else {
      this.router.navigate(['/authentication/login'])
    }
    this.loanNumber = this.url.snapshot.params['number'];
    this.ssn = this.url.snapshot.params['ssn'];
    this.getData();

  }
  name = ""
  paid_before = ""
  amount = ""
  duration = ""
  balance = 0
  email = ""
  user: any;
  loan: any;
  accepted = false;
  rejected = false;
  noResponse = false;
  getData() {
    this.data.getUser(this.ssn).subscribe(

      (result: any) => {
        this.user = result;
        this.name = result.name
        this.email = result.email
        this.balance = result.balance
      }

    )
    this.data.getLoan(this.loanNumber).subscribe(

      (result: any) => {
        this.loan = result;
        this.amount = result.amount
        this.duration = result.duration
        this.paid_before = result.date_paid_before
        if (result.status == "2") {
          this.noResponse = true

        }
        else if (result.status == "1") {
          this.accepted = true
        }
        else {
          this.rejected = true
        }


      }

    )
  }

  update(status) {
    this.updateLoan.controls["status"].setValue(Number(status));
    this.loan.status = status;
    this.data.updateLoan(this.updateLoan.value, this.loanNumber).subscribe(
      (result: any) => {
        this.ngOnInit()
      }
    )
    if (status == 1) {


      this.updateUser.controls["balance"].setValue(this.balance)

      this.router.navigate(['/admin/loan'])

    }
    else {
      this.router.navigate(['/admin/loan'])

    }


  }


  openPdfViewer() {
    const dialogRef = this.dialog.open(PassportComponent, {
      width: '800px',
      data: {
        pdfUrl: this.user.passport_file
      }
    });
  }
}
