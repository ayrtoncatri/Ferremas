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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductosComponent,
    AddProductComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    PaymentFailureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
