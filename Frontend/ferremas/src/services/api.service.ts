import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getMessage() {
    return this.http.get(`${this.baseUrl}/message`, { responseType: 'text' });
  }

  uploadImage(image: File, productId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', image, image.name);
    formData.append('productId', productId.toString());
    return this.http.post(`${this.baseUrl}/uploads`, formData);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

  deleteProductFromCart(cartId: string, productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/carts/${cartId}/items/${productId}`);
  }

  deleteProduct(productCode: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${productCode}`);
  }

  


}

