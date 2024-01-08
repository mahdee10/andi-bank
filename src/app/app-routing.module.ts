import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [

  { path: "", redirectTo: "/client/home", pathMatch: "full" },


  { path: 'client', 
  component: ClientComponent,
  loadChildren: () => import('./client/client.module').then(m => m.ClientModule) 
  },

  { path: 'user',
  component: UserComponent,
   loadChildren: () => import('./user/user.module').then(m => m.UserModule) },

  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },

  { path: 'admin',
  component:AdminComponent,
   loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
