import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DebitCardComponent } from './debit-card/debit-card.component';
import { TransactionComponent } from './transaction/transaction.component';
import { LoanComponent } from './loan/loan.component';
import { OnlineServicesComponent } from './online-services/online-services.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatOptionModule, NativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from "@angular/material/input";
import { DataService } from './data.service';
import { AuthService } from '../authentication/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoanPredictionComponent } from './loan-prediction/loan-prediction.component';
import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    UserComponent,
    UserNavComponent,
    DebitCardComponent,
    TransactionComponent,
    LoanComponent,
    OnlineServicesComponent,
    ContactComponent,
    EditProfileComponent,
    LoanPredictionComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatIconModule,
    MatIconModule,
    MatListModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    HttpClientModule,
    NativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    // BrowserModule,
    // BrowserAnimationsModule
  ],
  providers:[
    DataService,
    AuthService,
    DatePipe
  ]

})
export class UserModule { }
