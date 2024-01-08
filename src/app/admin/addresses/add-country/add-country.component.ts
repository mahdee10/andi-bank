import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PopupService } from '@ng-bootstrap/ng-bootstrap/util/popup';
import { AdminServiceService } from '../../admin-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from "@angular/core";
@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent {
  createCountry!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private data2: AdminServiceService,
    public dialogRef: MatDialogRef<AddCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.Form();
  }

  Form() {
    this.createCountry = this.fb.group({
      country_code: [""],
      name: ["", [Validators.required]],
    });

  }

  onRegister() {
    this.createCountry.controls["country_code"].setValue(Number(this.createCountry.controls["country_code"].getRawValue()));
    this.data2.createCountry(this.createCountry.value).subscribe(
      error => {

        this.dialogRef.close();

      }


    )
    this.createCountry.reset();
    Object.keys(this.createCountry.controls).forEach(key => {
      this.createCountry.get(key).setErrors(null);
    });
  }

}
