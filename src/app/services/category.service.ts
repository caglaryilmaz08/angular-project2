import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategoryService } from '../models/icategoryservice';
import { ICategory } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryService implements ICategoryService {
  public static categoriesUrl =
    'https://medieinstitutet-wie-products.azurewebsites.net/api/categories';

  constructor(private http: HttpClient) {}

  getDataArray(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(CategoryService.categoriesUrl);
  }

  getData(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(CategoryService.categoriesUrl + '/' + id);
  }
}
