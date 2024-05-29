import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product.models';
import { ApiService } from 'src/services/api.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  products: Product[] = [];

<<<<<<< HEAD
  constructor(private http: HttpClient,
              private productService: ProductService,
              private apiService: ApiService){}
=======
  constructor(private productService: ProductService) {}
>>>>>>> d75e544ff620f70f4e7250b73016b46a52748de0

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  // products: Product[] = [];
  // selectedProductId: string ='';
  // selectedFile: File | null = null;

  // constructor(private http: HttpClient,
  //             private productService: ProductService){}

  // ngOnInit() {
  //   this.productService.getProducts().subscribe((data) => {
  //     this.products = data;
  //   });
  // }

  // onFileSelected(event: any, productoId: string) {
  //   this.selectedFile = event.target.files[0];
  //   this.selectedProductId = productoId;
  // }

  // uploadImageForProduct() {
  //   if (this.selectedFile && this.selectedProductId) {
  //     const formData = new FormData();
  //     formData.append('image', this.selectedFile, this.selectedFile.name);

  //     this.http.post(`/products/${this.selectedProductId}/uploads`, formData)
  //       .subscribe(
  //         (res) => console.log(res),
  //         (err) => console.error(err)
  //       );
  //   }
  // }

  deleteProduct(productCode: string): void {
    this.apiService.deleteProduct(productCode).subscribe(response => {
      console.log('Producto eliminado:', response);
      this.products = this.products.filter(product => product.productCode !== productCode);
    }, error => {
      console.error('Error eliminando el producto:', error);
    });
  }



}
