import { Component } from '@angular/core';
import { AdminServiceService } from '../admin-service.service';
import { Router } from '@angular/router';
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

  constructor(private data: AdminServiceService, private router: Router) {

  }
  services: any;
  ngOnInit() {
    if (localStorage.getItem("role") == "admin") { }
    else {
      this.router.navigate(['/authentication/login'])
    }
    this.data.getServices().subscribe(
      (result: any) => {
        this.services = result;

      });
  }
  onFreeze(s) {
    s.is_freezed = !s.is_freezed;
    this.data.freezeService(s).subscribe(
      data => {
        this.data.getServices().subscribe(
          (result: any) => {
            this.services = result;
          }
        )
      })
  }
}
