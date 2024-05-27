import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../services/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token_ws'];
      if (token) {
        this.paymentService.confirmPayment(token).subscribe(
          response => {
            console.log('Payment confirmed:', response);
          },
          error => {
            console.error('Error confirming payment:', error);
          }
        );
      }
    });
  }

}
