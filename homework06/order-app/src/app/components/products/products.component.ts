import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/interfaces/product.inteface';
import { OrdersService } from 'src/app/service/orders.service';
import { PRODUCTS_DATA } from '../mock-data/products.data';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private readonly orderService: OrdersService) {}

  products: Product[] = [];

  private productListSubscription: Subscription;
  ngOnInit(): void {
    this.productListSubscription = this.orderService.getAllProducts.subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
    });
  }

  onButtonClick(productId: number) {
    this.orderService.onOrderClick(productId);
  }
  isButtonDisabled(productId: number): boolean {
    const product = this.products.find((p) => p.id === productId);
    return !product || product.stock === 0;
  }
  ngOnDestroy(): void {
    this.productListSubscription.unsubscribe();
  }
}
