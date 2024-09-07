import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SizeType } from '../components/products/models/sizeType.models';


@Injectable({
  providedIn: 'root'
})
export class SizeTypeService {

  private backendUrl: string;
  private complementUrl: string;

  constructor(private httpClient: HttpClient) {

    this.backendUrl = environment.backendUrl;
    this.complementUrl = 'sizeType';

  }

  public getAllSizeTyper(): Observable<SizeType[]> {
    return this.httpClient.get<SizeType[]>(`${this.backendUrl}/${this.complementUrl}/all`);
  }

  public getSizeType(id: number): Observable<SizeType[]> {
    return this.httpClient.get<SizeType[]>(`${this.backendUrl}/${this.complementUrl}/get/${id}`);
  }
}
