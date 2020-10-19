import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StoresComponent } from './stores/stores.component';
import { AdminguardGuard } from './adminguard.guard';
import { AddstoreComponent } from './addstore/addstore.component';
import { EditComponent } from './edit/edit.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserproductsComponent } from './userproducts/userproducts.component';
import { UserstoresComponent } from './userstores/userstores.component';
import { CartComponent } from './cart/cart.component';
import { UserauthguardGuard } from "../app/userauthguard.guard";
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
const routes: Routes = [
  { path: 'admin/dashboard/stores', component: StoresComponent, canActivate: [AdminguardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword/:userid', component: ResetpasswordComponent },

  { path: 'admin/login', component: AdminLoginComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AdminguardGuard] },
  { path: 'userstores', component: UserstoresComponent, canActivate: [UserauthguardGuard] },

  { path: 'admin/dashboard/stores/add', component: AddstoreComponent, canActivate: [AdminguardGuard] },
  { path: 'admin/dashboard/stores/:id', component: EditComponent, canActivate: [AdminguardGuard] },
  { path: 'admin/dashboard/stores/:id/products', component: ProductsComponent, canActivate: [AdminguardGuard] },
  { path: 'dashboard/userstores/:id/userproducts', component: UserproductsComponent, canActivate: [UserauthguardGuard] },
  { path: 'dashboard/userstores/userproducts/cart', component: CartComponent, canActivate: [UserauthguardGuard] },


  { path: 'admin/dashboard/stores/:id/products/add', component: AddproductComponent, canActivate: [AdminguardGuard] },
  { path: 'admin/dashboard/stores/:urlid/products/:id/edit', component: EditproductComponent, canActivate: [AdminguardGuard] },


  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
