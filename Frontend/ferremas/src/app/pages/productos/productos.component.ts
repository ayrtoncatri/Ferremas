import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/app/models/product.models';
import { ApiService } from 'src/services/api.service';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{


  constructor(private http: HttpClient,
              private productService: ProductService,
              private apiService: ApiService){}
  

  ngOnInit() {
    this.loadProducts();
    this.productService.getProducts().subscribe((data) => {
    this.products = data;
     });
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

    products: Product[] = [];
    selectedProductId: string ='';
    selectedFile: File | null = null;



  onFileSelected(event: any, productoId: string) {
    this.selectedFile = event.target.files[0];
    this.selectedProductId = productoId;
  }

  uploadImageForProduct() {
    if (this.selectedFile && this.selectedProductId) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post(`/products/${this.selectedProductId}/uploads`, formData)
        .subscribe(
          (res) => console.log(res),
          (err) => console.error(err)
        );
    }
  }




  deleteProduct(productCode: string): void {
    this.apiService.deleteProduct(productCode).subscribe(response => {
      console.log('Producto eliminado:', response);
      this.products = this.products.filter(product => product.productCode !== productCode);
    }, error => {
      console.error('Error eliminando el producto:', error);
    });
  }
}
