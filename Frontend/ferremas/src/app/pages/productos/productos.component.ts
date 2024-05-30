import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/app/models/product.models';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      // Asegúrate de que cada producto tenga un array en la propiedad 'price'
      this.products = data.map(product => ({
        ...product,
        price: Array.isArray(product.price) ? product.price : []
      }));
    });
  }

  deleteProduct(productCode: string): void {
    this.productService.deleteProduct(productCode).subscribe(() => {
      this.loadProducts();
    });
  }

}
