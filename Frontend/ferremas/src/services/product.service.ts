import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getProductByCode(productCode: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${productCode}`);
  }

  addProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  deleteProductByCode(code: String): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${code}`);
  }

}
