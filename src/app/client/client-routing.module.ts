import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ClientComponent } from './client.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:"", redirectTo:'home',pathMatch:'full'},
  // { path: 'client', component: ClientComponent },
  { path: "home", component: HomeComponent },
  { path: "aboutus", component: AboutusComponent },
  { path: "contactus", component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
