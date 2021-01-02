import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ICategory } from '../../../models/icategory';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-movie-categories',
  templateUrl: './movie-categories.component.html',
  styleUrls: ['./movie-categories.component.scss'],
})
export class MovieCategoriesComponent implements OnInit {
  categories: ICategory[];
  @Output() eventEmitter = new EventEmitter<number>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getDataArray().subscribe((data = []) => {
      this.categories = data;
    });
  }

  filterProducts(id: number) {
    this.eventEmitter.emit(id);
  }
}
