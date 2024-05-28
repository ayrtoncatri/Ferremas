import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/services/payment.service';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  isLoading = false;

  constructor(private paymentService: PaymentService,
              private navigationService: NavigationService) {}

  ngOnInit(): void {
    if (this.navigationService.shouldInitiatePayment()) {
      this.initiatePayment();
    }
  }

  initiatePayment() {
    const cartId = '12345';
    const amount = 1000;

    this.paymentService.initiatePayment(cartId, amount).subscribe(
      response => {
        console.log('Payment initiated:', response);
        this.redirectToPayment(response.url, response.token);
      },
      error => {
        console.error('Error initiating payment:', error);
        this.isLoading = false;
      }
    );
  }

  redirectToPayment(url: string, token: string) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;

    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = 'token_ws';
    tokenInput.value = token;

    form.appendChild(tokenInput);
    document.body.appendChild(form);

    setTimeout(() => {
      form.submit();
    }, 0);
  }

  confirmPayment(token: string) {
    this.paymentService.confirmPayment(token).subscribe(
      response => {
        console.log('Payment confirmed:', response);
      },
      error => {
        console.error('Error confirming payment:', error);
      }
    );
  }


}
