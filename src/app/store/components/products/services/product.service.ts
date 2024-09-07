import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductModel } from '../models/product.models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private backendUrl: string;
  private complementUrl: string;

  constructor(private httpClient: HttpClient) {
    this.backendUrl = environment.backendUrl;
    this.complementUrl = 'product';
  }

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.backendUrl}/${this.complementUrl}/all`);
  }

  public getProduct(uuid: string): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.backendUrl}/${this.complementUrl}/get/${uuid}`);
  }

  public createProduct(product: ProductModel): Observable<void> {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );
    return this.httpClient.post<void>(`${this.backendUrl}/${this.complementUrl}/register/${product.categoryId}`, { ...product }, { headers });
  }

  public updateProduct(product: ProductModel, productId: string): Observable<void> {
    const headers: HttpHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );
    return this.httpClient.patch<void>(`${this.backendUrl}/${this.complementUrl}/update/${product.categoryId}/${productId}`, { ...product }, { headers });
  }
}
