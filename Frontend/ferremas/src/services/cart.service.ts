import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createCart(): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/carts`, {});
  }

  addToCart(cartId: string, productId: string, quantity: number): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/carts/${cartId}/items`, { productId, quantity });
  }

  getCartItems(cartId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/carts/${cartId}/items`);
  }

  removeFromCart(cartId: string, productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/carts/${cartId}/items/${productId}`);
  }
}
