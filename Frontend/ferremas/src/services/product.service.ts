import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.models';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductByCode(productId: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productId}`);
  }


  createProduct(formData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(this.apiUrl, formData, { headers });
  }

  updateProduct(productId: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put(`${this.apiUrl}/${productId}`, formData, { headers });
  }


  // updateProduct(productCode: string, product: Product, image: File | null): Observable<any> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  //   return this.http.put(`${this.apiUrl}/${productCode}`, product, { headers });

  // }

  deleteProduct(productId: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(`${this.apiUrl}/${productId}`, { headers });
  }

}


