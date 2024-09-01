import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/categories.models';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CategoryService {

  private backendUrl: string;
  private complementUrl: string;

  constructor(private httpClient: HttpClient) {
    this.backendUrl = environment.backendUrl;
    this.complementUrl = 'category';
  }

  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.backendUrl}/${this.complementUrl}/all`)
      .pipe(map((result: Category[]) => result))
  }
}
