import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.models';

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
}
