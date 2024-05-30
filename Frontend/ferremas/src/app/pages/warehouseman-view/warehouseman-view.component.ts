import { Component } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/app/models/product.models';

@Component({
  selector: 'app-warehouseman-view',
  templateUrl: './warehouseman-view.component.html',
  styleUrls: ['./warehouseman-view.component.css']
})
export class WarehousemanViewComponent {

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
