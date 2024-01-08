import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { OnlineServicesComponent } from './online-services/online-services.component';
import { AdminServiceService } from './admin-service.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AddressesComponent } from './addresses/addresses.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddAddressComponent } from './addresses/add-address/add-address.component';
import { MatDialogModule } from "@angular/material/dialog";
import { AddCountryComponent } from './addresses/add-country/add-country.component';
import { LoanComponent } from './loan/loan.component';
import { LoanDecisionComponent } from './loan/loan-decision/loan-decision.component';
import { PassportComponent } from './loan/loan-decision/passport/passport.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminNavComponent,
    OnlineServicesComponent,
    AddressesComponent,
    AddAddressComponent,
    AddCountryComponent,
    LoanComponent,
    LoanDecisionComponent,
    PassportComponent,
    AddAdminComponent,
    TransactionsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
    
  ],
  providers:[
    AdminServiceService
  ]
})
export class AdminModule { }
