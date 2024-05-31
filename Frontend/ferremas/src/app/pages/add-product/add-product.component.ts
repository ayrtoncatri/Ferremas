import { ProductService } from 'src/services/product.service';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product',

  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent{

  // product: Product = {

  //   productCode: '',
  //   brand: '',
  //   code: '',
  //   name: '',
  //   price: [],
  //   image: ''
  // };

  // price = {
  //   Fecha: '',
  //   Valor: 0
  // };

  // selectedFile: File | null = null;
  // isEditMode = false;

  // constructor(
  //   private productService: ProductService,
  //   private route: ActivatedRoute,
  //   private router: Router
  // )
  //     {
  //       this.initializeForm();
  //     }


  // initializeForm(): void {
  //   const productCode = this.route.snapshot.paramMap.get('productCode');
  //   if (productCode) {
  //         this.isEditMode = true;
  //         this.productService.getProductByCode(productCode).subscribe((data: Product) => {
  //           this.product = data;
  //         });
  //   }
  // }

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  // addPrice(): void {
  //   this.product.price.push({ Fecha: this.price.Fecha, Valor: this.price.Valor });
  //   this.price = { Fecha: '', Valor: 0 };
  // }

  // onSubmit(): void {
  //   this.addPrice();
  //   const formData = new FormData();

  //   console.log('Product before sending:', this.product);

  //   if (this.product) {
  //     formData.append('productCode', this.product.productCode);
  //     formData.append('brand', this.product.brand);
  //     formData.append('code', this.product.code);
  //     formData.append('name', this.product.name);
  //     formData.append('price', JSON.stringify(this.product.price));
  //   } else {
  //     console.error('Producto no inicializado correctamente');
  //     return;
  //   }

  //   if (this.selectedFile) {
  //     formData.append('image', this.selectedFile, this.selectedFile.name);
  //   } else {
  //     console.warn('No se seleccionó ninguna imagen');
  //   }

  //   console.log('FormData before sending:');
  //   formData.forEach((value, key) => {
  //     console.log(`${key}: ${value}`);
  //   });

  //   if (this.isEditMode) {
  //     this.productService.updateProduct(this.product.productCode, formData).subscribe(
  //       response => {
  //         console.log('Producto actualizado:', response);
  //         this.router.navigate(['/products']);
  //       },
  //       error => {
  //         console.error('Error al actualizar producto:', error);
  //       }
  //     );
  //   } else {
  //     this.productService.createProduct(formData).subscribe(
  //       response => {
  //         console.log('Producto agregado:', response);
  //         this.router.navigate(['/products']);
  //       },
  //       error => {
  //         console.error('Error al agregar producto:', error);
  //       }
  //     );
  //   }
  // }

}
