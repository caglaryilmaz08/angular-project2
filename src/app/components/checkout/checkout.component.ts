import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Order, OrderRow } from '../../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart: CartItem[];

  orderForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    address: this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', Validators.required],
    }),
    email: ['', Validators.required, Validators.email],
    phone: ['', Validators.required],
  });

  selectPaymentForm = this.fb.group({
    payment: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  onSubmit() {
    const orderRows = this.cart.map((itemInCart) => {
      return new OrderRow(itemInCart.quantity, itemInCart.product.id);
    });

    const order = new Order(
      5555,
      new Date().toISOString(),
      this.orderForm.get('email').value,
      this.selectPaymentForm.get('payment').value,
      0,
      orderRows,
      this.getTotalPrice()
    );

    this.orderService.createOrder(order).subscribe(() => {
      this.cartService.emptyCart();
      this.router.navigate(['/confirmation']);
    });
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
    this.cart = this.cartService.getCart();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}
