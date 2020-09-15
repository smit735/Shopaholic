import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StoresComponent } from './stores/stores.component';
import { AdminguardGuard } from './adminguard.guard';
import { AddstoreComponent } from './addstore/addstore.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'admin/stores', component: StoresComponent, canActivate: [AdminguardGuard] },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/stores/add', component: AddstoreComponent },
  { path: 'admin/stores/:id', component: EditComponent },

  {
    path: '',
    redirectTo: 'admin/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
