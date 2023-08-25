import { Component, DoCheck, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.inteface';
import { OrdersService } from 'src/app/service/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements DoCheck {
  constructor(private readonly orderService: OrdersService) {}

  myOrders: Product[] = [];
  ngOnInit(): void {
    this.myOrders = this.orderService.getMyOrders();
    console.log(this.myOrders, 'ng on init');
  }
  ngDoCheck(): void {
    this.myOrders = this.orderService.getMyOrders();
    console.log(this.myOrders, 'ng do check');
  }
  onButtonClick(productId: number) {
    this.orderService.onRemoveButton(productId);
  }
}
