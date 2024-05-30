import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { Product } from 'src/app/models/product.models';
import { HttpHeaders } from '@angular/common/http';





@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit{

  products: Product[] = [];
  newProduct: Product = {
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
  editingProduct: Product | null = null;
  selectedFile: File | null = null;
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService
  ) {
  }


  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data.map(product => ({
        ...product,
        price: Array.isArray(product.price) ? product.price : []
      }));
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  addPrice(): void {
    this.newProduct.price.push({ Fecha: this.price.Fecha, Valor: this.price.Valor });
    this.price = { Fecha: '', Valor: 0 };
  }

  createProduct(): void {
    this.addPrice();
    const formData = new FormData();

    formData.append('productCode', this.newProduct.productCode);
    formData.append('brand', this.newProduct.brand);
    formData.append('code', this.newProduct.code);
    formData.append('name', this.newProduct.name);
    formData.append('price', JSON.stringify(this.newProduct.price));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productService.createProduct(formData).subscribe(
      response => {
        console.log('Producto agregado:', response);
        this.loadProducts();
        this.resetForm();
      },
      error => {
        console.error('Error al agregar producto:', error);
      }
    );
  }

  updateProduct(): void {
    if (this.editingProduct && this.editingProduct.id) {
      this.editingProduct.price = [{ Fecha: this.price.Fecha, Valor: this.price.Valor }];
      const formData = new FormData();

      formData.append('productCode', this.editingProduct.productCode);
      formData.append('brand', this.editingProduct.brand);
      formData.append('code', this.editingProduct.code);
      formData.append('name', this.editingProduct.name);
      formData.append('price', JSON.stringify(this.editingProduct.price));

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }

      this.productService.updateProduct(this.editingProduct.id, formData).subscribe(
        response => {
          console.log('Producto actualizado:', response);
          this.loadProducts();
          this.resetForm();
        },
        error => {
          console.error('Error al actualizar producto:', error);
        }
      );
    } else {
      console.error('No se puede actualizar el producto: id no definido');
    }
  }
  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(
      response => {

        console.log('Producto eliminado:', response);
        this.loadProducts();
      },
      error => {
        console.error('Error al eliminar producto:', error);
      }
    );
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.newProduct = {
      productCode: '',
      brand: '',
      code: '',
      name: '',
      price: [],
      image: ''
    };
    this.editingProduct = null;
    this.price = { Fecha: '', Valor: 0 };
    this.selectedFile = null;
  }

  // onSubmit(): void {
  //   this.addPrice();
  //   const formData = new FormData();

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

  //   if (this.editingProductCode) {
  //     this.productService.updateProduct(this.editingProductCode, formData).subscribe(
  //       response => {
  //         console.log('Producto actualizado:', response);
  //         this.loadProducts();
  //         this.resetForm();
  //       },
  //       error => {
  //         console.error('Error al actualizar producto:', error);
  //       }
  //     );
  //   } else {
  //     this.productService.createProduct(formData).subscribe(
  //       response => {
  //         console.log('Producto agregado:', response);
  //         this.loadProducts();
  //         this.resetForm();
  //       },
  //       error => {
  //         console.error('Error al agregar producto:', error);
  //       }
  //     );
  //   }
  // }

  // deleteProduct(productCode: string): void {
  //   this.productService.deleteProduct(productCode).subscribe(() => {
  //     this.loadProducts();
  //   });
  // }

  // editProduct(productCode: string): void {
  //   this.productService.getProductByCode(productCode).subscribe((data: Product) => {
  //     this.product = data;
  //     this.editingProductCode = productCode;
  //   });
  // }

  // resetForm(): void {
  //   this.product = {
  //     productCode: '',
  //     brand: '',
  //     code: '',
  //     name: '',
  //     price: [],
  //     image: ''
  //   };
  //   this.price = { Fecha: '', Valor: 0 };
  //   this.selectedFile = null;
  //   this.editingProductCode = null;
  // }
}

  // products: Product[] = [];

  // constructor(private productService: ProductService) {}

  // ngOnInit() {
  //   this.loadProducts();
  // }

  // loadProducts(): void {
  //   this.productService.getProducts().subscribe((data: Product[]) => {
  //     // Asegúrate de que cada producto tenga un array en la propiedad 'price'
  //     this.products = data.map(product => ({
  //       ...product,
  //       price: Array.isArray(product.price) ? product.price : []
  //     }));
  //   });
  // }

  // deleteProduct(productCode: string): void {
  //   this.productService.deleteProduct(productCode).subscribe(() => {
  //     this.loadProducts();
  //   });
  // }


