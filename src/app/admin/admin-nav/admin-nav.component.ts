import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private data: AdminServiceService) { }
  name: any

  ngOnInit() {

    if (localStorage.getItem("role") == "admin") { }
    else {
      this.router.navigate(['/authentication/login'])
    }
    this.name = localStorage.getItem("c")

    this.data.getAdmin().subscribe(

      (result: any) => {

        this.name = result.name

      }

    )
  }

  logout() {
    localStorage.removeItem("a")
  }
}
