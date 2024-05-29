import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cart.models';
import { CartService } from 'src/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.cartService.getCartItems().subscribe(
      (data) => {
        this.cartItems = data;
      },
      (error) => {
        console.error('Error al obtener ítems del carrito', error);
      }
    );
  }

  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId).subscribe(
      (response) => {
        console.log('Producto eliminado del carrito');
        this.loadCartItems();
      },
      (error) => {
        console.error('Error al eliminar producto del carrito', error);
      }
    );
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price[0]?.Valor * item.quantity, 0);
  }
}
