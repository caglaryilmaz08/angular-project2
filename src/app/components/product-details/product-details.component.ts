import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() products: IProduct[];
  product: IProduct;
  categories: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getMovie();
    this.route.paramMap.subscribe(() => {
      this.getMovie();
    });
  }

  getMovie() {
    const id = this.route.snapshot.paramMap.get('id');
    return this.productService.getData(Number(id)).subscribe((data) => {
      this.product = data;
      this.getCategoryForId(data.productCategory[0].categoryId);
    });
  }

  addProductToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  getCategoryForId(id: number) {
    this.categoryService.getData(id).subscribe((category) => {
      this.categories = category.name;
    });
  }
}
