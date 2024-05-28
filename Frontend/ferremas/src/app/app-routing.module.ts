import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { PaymentSuccessComponent } from './pages/payment-success/payment-success.component';
import { PaymentFailureComponent } from './pages/payment-failure/payment-failure.component';
import { PaymentComponent } from './pages/payment/payment.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "productos",
    component: ProductosComponent
  },
  {
    path: 'payment-success',
  component: PaymentSuccessComponent
  },
  {
    path: 'payment-failure',
  component: PaymentFailureComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
