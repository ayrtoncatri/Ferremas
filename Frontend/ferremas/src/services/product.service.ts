import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  public products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: Product, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('productCode', product.productCode);
    formData.append('brand', product.brand);
    formData.append('code', product.code);
    formData.append('name', product.name);
    formData.append('price', JSON.stringify(product.price));
    if (image) {
      formData.append('image', image, image.name);
    }

  createProduct(formData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.post(this.apiUrl, formData, { headers });
  }

  updateProduct(productCode: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put(`${this.apiUrl}/${productCode}`, formData, { headers });
  }

  deleteProductByCode(code: String): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${code}`);
  }

  deleteProduct(productCode: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete(`${this.apiUrl}/${productCode}`, { headers });
  }
}
