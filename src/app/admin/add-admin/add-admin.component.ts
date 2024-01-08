import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  fields = ['a_id', 'name', 'email', 'password']

  constructor(private fb: UntypedFormBuilder,
    private data: AdminServiceService,) {

    this.Form()
  }

  hide = true;
  createAdmin: UntypedFormGroup
  Form() {
    this.createAdmin = this.fb.group({
      a_id: [""],
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ["", [Validators.required]],
    });
  }

  onRegister() {
    this.createAdmin.controls["a_id"].setValue(Number(this.createAdmin.controls["a_id"].getRawValue()));
    this.data.addAdmin(this.createAdmin.value).subscribe(

    )
    this.createAdmin.reset();
    Object.keys(this.createAdmin.controls).forEach(key => {
      this.createAdmin.get(key).setErrors(null);
    });
  }
}
