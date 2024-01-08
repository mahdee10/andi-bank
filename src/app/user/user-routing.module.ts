import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DebitCardComponent } from './debit-card/debit-card.component';
import { LoanComponent } from './loan/loan.component';
import { OnlineServicesComponent } from './online-services/online-services.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserComponent } from './user.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoanPredictionComponent } from './loan-prediction/loan-prediction.component';

const routes: Routes = [
  // { path: '', component: UserComponent },
  { path: "transaction", component: TransactionComponent },
  {path: "edit/:id",component: EditProfileComponent},
  { path: "debit", component: DebitCardComponent },
  { path: "predict", component: LoanPredictionComponent },
  { path: "loan", component: LoanComponent },
  { path: "onlineServices", component: OnlineServicesComponent },
  { path: "contact", component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
