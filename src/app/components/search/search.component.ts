import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  products: IProduct[];
  searchString: string;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.searchString = params.get('searchString');
      this.getSearchResults();
    });
  }

  getSearchResults() {
    this.searchService.getSearchResult(this.searchString).subscribe((data) => {
      this.products = data;
    });
  }
}
