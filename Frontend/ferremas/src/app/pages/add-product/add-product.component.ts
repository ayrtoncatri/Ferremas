import { ProductService } from 'src/services/product.service';
import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {


  product: Product = {
    productCode: '',
    brand: '',
    code: '',
    name: '',
    price: [],
    image: ''
  };

  price = {
    Fecha: '',
    Valor: 0
  };
  selectedFile: File | null = null;

  constructor(private productService: ProductService) {}

  products: Product[] = [];

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  addPrice() {
    this.product.price.push({ Fecha: this.price.Fecha, Valor: this.price.Valor });
  }

  onSubmit() {
    this.addPrice();
    const formData = new FormData();

    console.log('Product before sending:', this.product);

    if (this.product) {
        formData.append('productCode', this.product.productCode);
        formData.append('brand', this.product.brand);
        formData.append('code', this.product.code);
        formData.append('name', this.product.name);
        formData.append('price', JSON.stringify(this.product.price));
    } else {
        console.error('Producto no inicializado correctamente');
        return;
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    } else {
      console.warn('No se seleccionó ninguna imagen');
    }

    console.log('FormData before sending:');
    formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
    });

    this.productService.addProduct(formData).subscribe(
      response => {
        location.reload()
        console.log('Producto agregado:', response);
        this.resetForm();
        
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  // Método para restablecer el formulario después de agregar un producto
  resetForm() {
    this.product = {
      productCode: '',
      brand: '',
      code: '',
      name: '',
      price: [],
      image: ''
    };
    this.price = {
      Fecha: '',
      Valor: 0
    };
    this.selectedFile = null; 
  }
}
