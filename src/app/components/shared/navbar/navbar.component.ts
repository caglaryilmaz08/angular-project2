import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchIsVisible = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {}

  cartQuantity(): number {
    return this.cartService.calculateQuantity();
  }

  searchForProduct(searchString: string) {
    searchString = searchString.trim();

    if (searchString !== '') {
      this.router.navigate(['/search'], { queryParams: { searchString } });
    }
  }
}
