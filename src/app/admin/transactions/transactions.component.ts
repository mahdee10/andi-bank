import { Component, ViewChild } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {
  constructor(private data: AdminServiceService) {

  }
  displayedColumns: string[] = [
    'Id',
    'date',
    'sender_SSN',
    'amount',
    'reciever_details',
  ];
  transactions: any;
  ngOnInit() {
    this.getData()
  }
  getData() {
    this.data.getTransactions().subscribe(
      (result: any) => {
        this.transactions = result;
        this.dataSource = new MatTableDataSource<any>(this.transactions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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
