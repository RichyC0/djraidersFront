import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../components/products/models/brand.models';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private backendUrl: string;
  private complementUrl: string;

  constructor(private httpClient: HttpClient) {

    this.backendUrl = environment.backendUrl;
    this.complementUrl = 'brand';
  }

  public getAllBrand(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.backendUrl}/${this.complementUrl}/all`);
  }

  public getBrand(id: number): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${this.backendUrl}/${this.complementUrl}/get/${id}`);
  }
}
