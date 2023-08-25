import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product.inteface';
import { PRODUCTS_DATA } from '../components/mock-data/products.data';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly router: Router) {}

  products: Product[] = PRODUCTS_DATA;
  myOrders: Product[] = [];
  getProducts(): Product[] {
    return this.products;
  }
  getMyOrders(): Product[] {
    return this.myOrders;
  }

  onOrderClick(productsId: number): boolean {
    const product = this.products.find((p) => p.id === productsId);

    if (product && product.stock > 0) {
      product.stock -= 1;
      this.addToMyOrders(product);
      return true;
    }

    return false;
  }
  addToMyOrders(product: Product): void {
    this.myOrders.push(product);
  }

  onRemoveButton(productId: number) {
    console.log('Removing product with ID:', productId);
    this.myOrders = this.myOrders.filter((p) => p.id !== productId);
    console.log(this.getMyOrders, 'product to remove');

    const product = this.products.find((p) => p.id === productId);
    if (product) {
      product.stock += 1;
    }
  }
}
