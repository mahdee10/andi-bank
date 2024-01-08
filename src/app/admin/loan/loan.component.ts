import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Loan } from './loan';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent {
  displayedColumns: string[] = [
    'date',
    'user_SSN',
    'amount',
    "actions"
  ];
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
  constructor(private data: AdminServiceService, private router: Router, private fb: UntypedFormBuilder, private dialog: MatDialog) {

  }
  loans: any;
  ngOnInit(): void {
    if (localStorage.getItem("role") == "admin") { }
    else {
      this.router.navigate(['/authentication/login'])
    }
    this.data.getLoans().subscribe(
      (result: any) => {
        this.loans = result;
        this.dataSource = new MatTableDataSource<Loan>(this.loans);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
  }

  editCall(row) {

  }

}
