import { ProductService } from 'src/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Product } from './models/product.models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ferremas';
  message: string = '';

  products: Product[] = [];

  constructor(private apiService: ApiService,
              private productService: ProductService){}

  ngOnInit() {
    this.apiService.getMessage().subscribe(
      (data) => this.message = data,
      (error) => console.error(error)
    );
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
