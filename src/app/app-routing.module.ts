import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StoresComponent } from './stores/stores.component';
import { AdminguardGuard } from './adminguard.guard';
import { AddstoreComponent } from './addstore/addstore.component';
import { EditComponent } from './edit/edit.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';

const routes: Routes = [
  { path: 'admin/stores', component: StoresComponent, canActivate: [AdminguardGuard] },
  { path: 'admin/login', component: LoginComponent },
  { path: 'admin/stores/add', component: AddstoreComponent },
  { path: 'admin/stores/:id', component: EditComponent },
  { path: 'admin/stores/:id/products', component: ProductsComponent },
  { path: 'admin/stores/:id/products/add', component: AddproductComponent },


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
