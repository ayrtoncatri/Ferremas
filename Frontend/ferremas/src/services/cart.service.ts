import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<CartItem[]>(`${this.apiUrl}/items`, { headers });
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity }, { headers });
  }

  removeFromCart(productId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(`${this.apiUrl}/remove`, { productId }, { headers });
  }
}
