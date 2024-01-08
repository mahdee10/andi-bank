import { Component, ViewChild } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(private data: AdminServiceService) {

  }
  displayedColumns: string[] = [
    'SSN',
    'name',
    'email',
    'balance',
    'address',
  ];
  users: any;
  ngOnInit() {
    this.getData()
  }
  getData() {
    this.data.getUsers().subscribe(
      (result: any) => {
        this.users = result;
        this.dataSource = new MatTableDataSource<any>(this.users);
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
