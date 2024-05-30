import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/layout/header/header.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { PaymentComponent } from './pages/payment/payment.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentFailureComponent } from './pages/payment-failure/payment-failure.component';
import { CurrencyPipe } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { UsersComponent } from './pages/users/users.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthComponent } from './pages/auth/auth.component';
import { JwtModule } from '@auth0/angular-jwt';
import { SellermanViewComponent } from './pages/sellerman-view/sellerman-view.component';
import { WarehousemanViewComponent } from './pages/warehouseman-view/warehouseman-view.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({

  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductosComponent,
    AddProductComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent,
    LoginComponent,
    UsersComponent,
    CartComponent,
    RegisterComponent,
    AuthComponent,
    SellermanViewComponent,
    WarehousemanViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'], // Cambia esto a tu dominio
        disallowedRoutes: ['http://localhost:3000/auth/']


      }
    })
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
