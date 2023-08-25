// Importing necessary modules and classes
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interfaces/product.inteface';
import { PRODUCTS_DATA } from '../components/mock-data/products.data';
import { BehaviorSubject, Subject } from 'rxjs';
import { MyOrder } from '../interfaces/myOrders.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  products: any; // Not used in this code

  constructor(private readonly router: Router) {}

  // Loading mock product data into a constant
  PRODUCTS_DATA: Product[] = PRODUCTS_DATA;

  // Array to store ordered products
  orderedProducts: MyOrder[] = [];

  // Creating a BehaviorSubject to provide a stream of all products
  getAllProducts = new BehaviorSubject<Product[]>(this.PRODUCTS_DATA);

  // Function to retrieve ordered products
  getOrderedProducts() {
    return this.orderedProducts;
  }

  // Function to handle adding a product to the order
  onOrderClick(productsId: number) {
    const existingProduct = this.orderedProducts.find(
      (product) => product.id === productsId
    );

    // If the product is already in the order, increase its quantity
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      // If the product is not in the order, add it with a quantity of 1
      const addProduct = this.PRODUCTS_DATA.find(
        (product) => product.id === productsId
      );
      if (addProduct && addProduct.stock > 0) {
        this.orderedProducts = [{ ...addProduct, quantity: 1 }];
      }
    }

    // Reduce the stock of the ordered product in the main product list
    this.PRODUCTS_DATA = this.PRODUCTS_DATA.map((product) => {
      if (productsId === product.id) {
        return {
          ...product,
          stock: product.stock - 1,
        };
      }
      return product;
    });

    // Update the BehaviorSubject with the updated product list
    this.getAllProducts.next(this.PRODUCTS_DATA);
  }

  // Function to handle removing a product from the order
  onRemoveButton(productId: number) {
    const existingProduct = this.orderedProducts.find(
      (product) => product.id === productId
    );

    // If the product's quantity in the order is 1, remove it from the order
    if (existingProduct?.quantity === 1) {
      this.orderedProducts = this.orderedProducts.filter(
        (product) => product.id !== productId
      );
    }

    // If the product is in the order, decrease its quantity
    if (existingProduct) {
      existingProduct.quantity -= 1;
    }

    // Increase the stock of the removed product in the main product list
    this.PRODUCTS_DATA = this.PRODUCTS_DATA.map((product) => {
      if (productId === product.id) {
        return {
          ...product,
          stock: product.stock + 1,
        };
      }
      return product;
    });

    // Update the BehaviorSubject with the updated product list
    this.getAllProducts.next(this.PRODUCTS_DATA);
  }
}
