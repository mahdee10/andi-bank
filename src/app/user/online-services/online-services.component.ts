import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-online-services',
  templateUrl: './online-services.component.html',
  styleUrls: ['./online-services.component.css'],
  animations: [
    trigger('listAnimation', [

      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0px)', offset: 1 }),
          ]))
        ]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('0.5s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0px)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75px)', offset: 1 }),
          ]))
        ]), { optional: true }),

      ])

    ])

  ]
})
export class OnlineServicesComponent {
  constructor(private router: Router, private fb: UntypedFormBuilder, private user: DataService) {
    this.Form()
  }
  services: any;
  createService!: UntypedFormGroup;
  ngOnInit() {
    if (localStorage.getItem("role") == "user") { }
    else {
      this.router.navigate(['/authentication/login'])
    }

    this.user.getServices().subscribe(
      (result: any) => {

        this.services = result;


      });
  }

  Form() {
    this.createService = this.fb.group({

      s_n: [""],
      u_SSN: ["", [Validators.required]],

    });

  }

  data = [
    { img: "../../../assets/serImg/attestation.jpg", title: "Slide 1" },
    { img: "../../../assets/serImg/power of attorney.jpg", title: "Slide 2" },
    { img: "../../../assets/serImg/Account Closure Request.jpg", title: "Slide 3" },
    { img: "../../../assets/serImg/Credit Card request.jpg", title: "Slide 4" },
    { img: "../../../assets/serImg/Stop Payment Request.jpg", title: "Slide 4" },
    { img: "../../../assets/serImg/Safe Deposit box.jpg", title: "Slide 5" },
  ];


  download() {

    window.open('../../../assets/services/Attestation', '_blank');

  }

  downloadFile(s) {
    let link = document.createElement("a");
    link.download = s;
    link.href = "../../../assets/services/" + s + ".docx";
    link.click();
  }
  submit(s_number) {
    this.createService.controls["u_SSN"].setValue(localStorage.getItem("a"));
    this.createService.controls["s_n"].setValue(s_number);

    this.user.createService(this.createService.value).subscribe(
      error => {
        alert("Form downloaded, please fill it and submit it to the nearest bank branch");

      }
    )
  }
}



