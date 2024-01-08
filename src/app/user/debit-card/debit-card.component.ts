import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Debit } from './debit';
import { User } from '../user';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-debit-card',
  templateUrl: './debit-card.component.html',
  styleUrls: ['./debit-card.component.css']
})
export class DebitCardComponent {
  constructor(private fb: UntypedFormBuilder, private user: DataService, private router: Router, public datepipe: DatePipe) {
    this.Form();
  }
  ngOnInit() {
    if (localStorage.getItem("role") == "user") { }
    else {
      this.router.navigate(['/authentication/login'])
    }
    this.getData();
  }
  displayedColumns: string[] = [
    'card_number',
    'amount',
    'date_obtained',
    'amount_with_interest',
    'date_paid_before',
    'paid',
  ];
  person: User | null;
  debits: Debit | any;
  createDebit!: UntypedFormGroup;
  updateUser!: UntypedFormGroup;
  getData() {
    this.user.getUser().subscribe(
      (result: any) => {
        this.person = result;

      });

    this.user.getDebit().subscribe(
      (result: any) => {
        this.debits = result;
        this.dataSource = new MatTableDataSource<Debit>(this.debits);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });


  }

  Form() {
    this.createDebit = this.fb.group({

      u_SSN: [Number(localStorage.getItem("a"))],
      card_number: [Math.floor(Math.random() * 10000)],
      amount: ["", [Validators.required]],


    });

    this.updateUser = this.fb.group({
      // SSN: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      balance: ["", [Validators.required]],
    })

  }

  today: any;
  canCreate = true;
  checkPaid(debit) {

    this.today = new Date();
    this.today = this.datepipe.transform(this.today, 'yyyy-MM-dd');
    if (new Date(this.today) > new Date(debit.date_paid_before)) {
      return true
    }
    else {
      this.canCreate = false;
      return false
    }
  }

  hidden = false;
  onRegister() {

    if (this.canCreate) {
      this.createDebit.controls["amount"].setValue(Number(this.createDebit.controls["amount"].getRawValue()));
      this.person.balance = Number(this.person.balance) + Number(this.createDebit.controls["amount"].getRawValue());

      this.user.createDebit(this.createDebit.value).subscribe(
        error => {
          this.getData();
        }
      )
      this.createDebit.reset();
      Object.keys(this.createDebit.controls).forEach(key => {
        this.createDebit.get(key).setErrors(null);
      });




      this.updateUser.controls["balance"].setValue(this.person.balance);

      this.user.updateUser(this.person.SSN, this.updateUser.value).subscribe(

      )
    }
    else {
      this.hidden = true;
      this.createDebit.reset();
      Object.keys(this.createDebit.controls).forEach(key => {
        this.createDebit.get(key).setErrors(null);
      });
    }




  }

  changeHidden() {
    this.hidden = !this.hidden;
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

}
