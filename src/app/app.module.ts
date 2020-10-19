import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthguardserviceService } from "./authguardservice.service";

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { StoresComponent } from './stores/stores.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AddstoreComponent } from './addstore/addstore.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { StoresReducer } from "./reducer";
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';


import { AgmCoreModule } from '@agm/core';
import { EditComponent } from './edit/edit.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { EditproductComponent } from './editproduct/editproduct.component';
import { EffectsModule } from '@ngrx/effects';
import { ShopEffects } from './effects';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserstoresComponent } from './userstores/userstores.component';
import { UserproductsComponent } from './userproducts/userproducts.component';
import { CartComponent } from './cart/cart.component';
import { ScrollingModule } from "@angular/cdk/scrolling";
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StoresComponent,
    HeaderComponent,
    FooterComponent,
    AddstoreComponent,
    EditComponent,
    ProductsComponent,
    AddproductComponent,
    EditproductComponent,
    RegisterComponent,
    DashboardComponent,
    UserstoresComponent,
    UserproductsComponent,
    CartComponent,
    AdminLoginComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSelectModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    ScrollingModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatGridListModule,
    MatMenuModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7OIrB6heC8PlZhX0jhHIt3he7OUkJpJ8',
      libraries: ['places']
    }),
    StoreModule.forRoot({ stores: StoresReducer }),
    EffectsModule.forRoot([ShopEffects]),
  ],
  providers: [AuthguardserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
