import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_FORMATS, MatOptionModule, NativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { RegisterComponent } from './register/register.component';
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { DateAdapter, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AuthService } from './auth.service';
import { DataService } from '../user/data.service';
import { NgxMaskModule } from "ngx-mask";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";


@NgModule({
  declarations: [

  
    LoginComponent,
        RegisterComponent,
        FileUploadComponent,

  ]
,
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    HttpClientModule,
    NativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    OwlDateTimeModule,
    MatDatepickerModule,
    OwlNativeDateTimeModule,
    NgxMaskModule,
    NgxMaskModule.forRoot()
  ],

  providers: [{provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS},
    DatePipe,
    AuthService,
    DataService,
    
  ],
})
export class AuthenticationModule { }
