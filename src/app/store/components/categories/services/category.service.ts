import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryModel } from '../models/categories.models';

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

  public getCategory(uuid: string): Observable<CategoryModel> {
    return this.httpClient.get<CategoryModel>(`${this.backendUrl}/${this.complementUrl}/get/${uuid}`)
  }

  public createCategory(category: CategoryModel): Observable<void> {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );
    return this.httpClient.post<void>(`${this.backendUrl}/${this.complementUrl}/register`, { ...category }, { headers });
  }

  public updateCategory(category: CategoryModel, categoryId: string): Observable<void> {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );
    return this.httpClient.patch<void>(`${this.backendUrl}/${this.complementUrl}/update/${categoryId}`, { ...category }, { headers });
  }
}
