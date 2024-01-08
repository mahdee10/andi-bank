import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OnlineServicesComponent } from './online-services/online-services.component';
import { AddressesComponent } from './addresses/addresses.component';
import { LoanComponent } from './loan/loan.component';
import { LoanDecisionComponent } from './loan/loan-decision/loan-decision.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  // { path: '', component: AdminComponent },
  {path:'services',component:OnlineServicesComponent},
  {path:'address',component:AddressesComponent},
  {path:'loan',component:LoanComponent},
  {path:'add',component:AddAdminComponent},
  {path:'transactions',component:TransactionsComponent},
  {path:'users',component:UsersComponent},
  {path: "decision/:ssn/:number",component: LoanDecisionComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
