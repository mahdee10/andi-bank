// import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { AdminServiceService } from '../../admin-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from "@angular/core";

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {
  createAddress!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private data2: AdminServiceService,
    public dialogRef: MatDialogRef<AddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.Form();
  }

  Form() {
    this.createAddress = this.fb.group({
      zip_code: [""],
      name: ["", [Validators.required]],
    });

  }

  onRegister() {
    this.createAddress.controls["zip_code"].setValue(Number(this.createAddress.controls["zip_code"].getRawValue()));
    this.data2.creatAddress(this.createAddress.value).subscribe(
      error => {

        this.dialogRef.close();

      }


    )
    this.createAddress.reset();
    Object.keys(this.createAddress.controls).forEach(key => {
      this.createAddress.get(key).setErrors(null);
    });
  }
}
