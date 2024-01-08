import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../user';
import { Transaction } from './transaction';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { UserNavComponent } from '../user-nav/user-nav.component';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  animations: [
    trigger('listAnimation', [

      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0px)', offset: 1 }),
          ]))
        ]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('0.5s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 1 }),
          ]))
        ]), { optional: true }),

      ])

    ])

  ]

})
export class TransactionComponent {
  createTransaction!: UntypedFormGroup;
  updateUser!: UntypedFormGroup;
  updateReciever!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder, private user: DataService, private auth: AuthService, private router: Router) {
    this.Form();
  }

  displayedColumns: string[] = [
    'date',
    'sender_SSN',
    'reciever_details',
    'amount'
  ];

  person: User | null;
  transactions: Transaction | any;
  u: any
  ngOnInit() {
    if (localStorage.getItem("role") == "user") { }
    else {
      this.router.navigate(['/authentication/login'])
    }
    this.user.getTransaction().subscribe(
      (result: any) => {
        this.transactions = result;

        this.dataSource = new MatTableDataSource<Transaction>(this.transactions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    this.getData();
  }

  getData() {
    this.user.getUser().subscribe(
      (result: any) => {
        this.person = result;


      });

    this.user.getTransaction().subscribe(
      (result: any) => {

        this.transactions = result;

        this.dataSource = new MatTableDataSource<Transaction>(this.transactions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

  Form() {
    this.createTransaction = this.fb.group({

      s_SSN: [""],
      amount: ["", [Validators.required]],
      r_SSN: ["", [Validators.required]],

    });
    this.updateUser = this.fb.group({
      // SSN: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      balance: ["", [Validators.required]],
    })
    this.updateReciever = this.fb.group({
      // SSN: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      balance: ["", [Validators.required]],
    })
  }

  response: any;
  onRegister() {
    this.createTransaction.controls["amount"].setValue(Number(this.createTransaction.controls["amount"].getRawValue()));
    this.createTransaction.controls["r_SSN"].setValue(Number(this.createTransaction.controls["r_SSN"].getRawValue()));
    this.createTransaction.controls["s_SSN"].setValue(this.person.SSN);



    if (this.person.balance > this.createTransaction.controls["amount"].getRawValue()) {

      this.user.createTransaction(this.createTransaction.value).subscribe(
        (response) => {
          this.response = response.body;


          if (this.response.is_ours == 1) {
            let receiver;

            this.user.getReceiver(this.createTransaction.controls["r_SSN"].getRawValue()).subscribe(
              (result: any) => {
                receiver = result;


                this.updateReciever.controls["balance"].setValue(Number(result.balance) + this.createTransaction.controls["amount"].getRawValue());
                this.user.updateUser(this.createTransaction.controls["r_SSN"].getRawValue(), this.updateReciever.value).subscribe(
                  response => {


                    alert("Transferred successfully");

                    Object.keys(this.createTransaction.controls).forEach(key => {
                      this.createTransaction.get(key).setErrors(null);
                      this.createTransaction.reset();
                    });

                  }
                )
              });



          }
          else {
            Object.keys(this.createTransaction.controls).forEach(key => {
              this.createTransaction.get(key).setErrors(null);
              this.createTransaction.reset();
            });
            alert("Transferred successfully");
          }

        })
      this.person.balance = this.person.balance - this.createTransaction.controls["amount"].getRawValue();
      localStorage.removeItem("balance")
      localStorage.setItem("balance", this.person.balance);
      //  this.componentB.ngOnInit()
      this.ngOnInit()

      // this.updateUser.controls["SSN"].setValue(this.person.SSN);
      this.updateUser.controls["balance"].setValue(this.person.balance);

      this.user.updateUser(this.person.SSN, this.updateUser.value).subscribe(

      )




      this.getData()
      this.getData()

    }
    else {
      this.createTransaction.reset();
      Object.keys(this.createTransaction.controls).forEach(key => {
        this.createTransaction.get(key).setErrors(null);
      });
      alert("You do not have this amount of money")
    }

    // this.createTransaction.reset();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  dataSource: any;
  private _liveAnnouncer!: LiveAnnouncer;
  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onPaginateChange($event: any) {

  }
  announceSortChange(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  @ViewChild(UserNavComponent) componentB: UserNavComponent
}
