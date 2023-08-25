import { Component, DoCheck, OnInit } from '@angular/core';
import { MyOrder } from 'src/app/interfaces/myOrders.interface';
import { Product } from 'src/app/interfaces/product.inteface';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements DoCheck {
  constructor(private readonly orderService: OrdersService) {}
  orderedProducts: MyOrder[] = [];

  ngOnInit(): void {
    this.orderedProducts = this.orderService.getOrderedProducts();
    console.log(this.orderService, 'orderedProducts');
  }
  ngDoCheck(): void {
    this.orderedProducts = this.orderService.getOrderedProducts();
  }
  onButtonClick(productId: number) {
    this.orderService.onRemoveButton(productId);
  }
}
