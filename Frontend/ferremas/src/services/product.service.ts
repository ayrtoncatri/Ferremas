import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Price {
  Fecha: string;
  Valor: number;
}

export interface Product {
  productCode: string;
  brand: string;
  code: string;
  name: string;
  price: Price[];
  image: string;
}

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

}
