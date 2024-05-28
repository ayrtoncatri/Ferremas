import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private initiatePaymentFlag = false;

  constructor(private router: Router) { }

  goToPayment() {
    this.initiatePaymentFlag = true;
    this.router.navigate(['/payment']);
  }

  shouldInitiatePayment(): boolean {
    const flag = this.initiatePaymentFlag;
    this.initiatePaymentFlag = false;
    return flag;
  }
}
