import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from '../user';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private data: DataService) { }

  person: User | null;
  logout() {
    localStorage.removeItem("a")
    localStorage.removeItem("b")
    localStorage.removeItem("role")
    localStorage.removeItem("c")
    localStorage.removeItem("email")
    localStorage.removeItem("balance")
    localStorage.removeItem("ssn")

  }
  onHover() {
    this.ngOnInit()
  }

  user: any
  ngOnInit() {
    if (localStorage.getItem("role") == "user") { }
    else {
      this.router.navigate(['/authentication/login'])
    }


    this.data.getUser().subscribe(

      (result: any) => {
        this.user = result;
        this.name = result.name
        this.email = result.email
        this.balance = result.balance
      }

    )

    this.name = localStorage.getItem("c")
    this.email = localStorage.getItem("email")
    this.balance = localStorage.getItem("balance")

  }
  email = "";
  ssn = localStorage.getItem("a")
  name = ""
  balance = ""

}
