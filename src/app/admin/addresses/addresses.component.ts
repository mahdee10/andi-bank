import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Address } from '../address';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AddAddressComponent } from './add-address/add-address.component';
import { MatDialog } from '@angular/material/dialog';
import { Nationality } from '../nationality';
import { AddCountryComponent } from './add-country/add-country.component';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent {
  displayedColumns: string[] = [
    'zip_code',
    'name',
  ];
  createAddress!: UntypedFormGroup;
  subs: any;


  @ViewChild(MatPaginator) paginator2!: MatPaginator;
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
  addresses: any;
  ngOnInit(): void {
    if (localStorage.getItem("role") == "admin") { }
    else {
      this.router.navigate(['/authentication/login'])
    }

    this.data.getAddresses().subscribe(
      (result: any) => {
        this.addresses = result;
        this.dataSource = new MatTableDataSource<Address>(this.addresses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )
    this.data.getCountries().subscribe(
      (result: any) => {

        this.countries = result;
        this.dataSource2 = new MatTableDataSource<Nationality>(this.countries);
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      }
    )
  }









  openDialog() {

    const dialogRef = this.dialog.open(AddAddressComponent, {
      data: {
        references: "id"
      }
    });


    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      this.data.getAddresses().subscribe(
        (result: any) => {

          this.addresses = result;
          this.dataSource = new MatTableDataSource<Address>(this.addresses);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      )
    });

  }


  openDialog2() {

    const dialogRef = this.dialog.open(AddCountryComponent, {
      data: {
        references: "id"
      }
    });


    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      this.data.getCountries().subscribe(
        (result: any) => {

          this.countries = result;
          this.dataSource2 = new MatTableDataSource<Nationality>(this.countries);
          this.dataSource2.paginator = this.paginator2;
          this.dataSource2.sort2 = this.sort2;
        }
      )
    });

  }




  displayedColumns2: string[] = [
    'country_code',
    'name',
  ];
  // @ViewChild(MatPaginator) paginator2!: MatPaginator;

  sort2!: MatSort;
  dataSource2: any;
  private _liveAnnouncer2!: LiveAnnouncer;
  applyFilter2(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource2.filter = filterValue;
  }
  onPaginateChange2($event: any) {
  }


  announceSortChange2(sortState: Sort) {

    if (sortState.direction) {
      this._liveAnnouncer2.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer2.announce('Sorting cleared');
    }
  }

  countries: any;


}
