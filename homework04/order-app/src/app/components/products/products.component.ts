import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.inteface';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private readonly orderService: OrdersService) {}

  products: Product[] = [];
  ngOnInit(): void {
    this.products = this.orderService.getProducts();
    console.log(this.products);
  }

  onButtonClick(productId: number) {
    this.orderService.onOrderClick(productId);
  }

  isButtonDisabled(productId: number): boolean {
    const product = this.orderService.products.find((p) => p.id === productId);
    return !product || product.stock === 0;
  }
}
