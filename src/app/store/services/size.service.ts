import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Size } from '../components/products/models/size.models';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private backendUrl: string;
  private complementUrl: string;

  constructor(private httpClient: HttpClient) {

    this.backendUrl = environment.backendUrl;
    this.complementUrl = 'size';

  }

  public getAllSize(categoryId: string): Observable<Size[]> {
    return this.httpClient.get<Size[]>(`${this.backendUrl}/${this.complementUrl}/all/${categoryId}`);
  }

  public getSize(id: number): Observable<Size[]> {
    return this.httpClient.get<Size[]>(`${this.backendUrl}/${this.complementUrl}/get/${id}`);
  }
}
