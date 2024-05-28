import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  initiatePayment(cartId: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments`, { cartId, amount });
  }

  confirmPayment(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments/confirm`, { token });
  }
}
