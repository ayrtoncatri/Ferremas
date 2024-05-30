import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './pages/productos/productos.component';

import { authGuard } from './auth.guard';
import { adminGuard } from './admin.guard';

import { CartComponent } from './pages/cart/cart.component';
import { UsersComponent } from './pages/users/users.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'products',
    component: ProductosComponent,
    canActivate: [authGuard, adminGuard]
  },
  {

    path: 'cart',
    component: CartComponent,
    canActivate: [authGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: 'payment',
    component: PaymentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [authGuard, adminGuard]

  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
