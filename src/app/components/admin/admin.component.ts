import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  orders: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().subscribe((data = []) => {
      this.orders = data;
    });
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to remove this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.getOrders();
      });
    }
  }
}
