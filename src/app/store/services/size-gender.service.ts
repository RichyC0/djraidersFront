import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SizeGender } from '../components/products/models/sizeGender.models';


@Injectable({
  providedIn: 'root'
})
export class SizeGenderService {

  private backendUrl: string;
  private complementUrl: string;


  constructor(private httpClient: HttpClient) {

    this.backendUrl = environment.backendUrl;
    this.complementUrl = 'sizeGender';

   }

   public getAllSizeGender(): Observable<SizeGender[]> {
    return this.httpClient.get<SizeGender[]>(`${this.backendUrl}/${this.complementUrl}/all`);
  }

  public getSizeGender(id: number): Observable<SizeGender[]> {
    return this.httpClient.get<SizeGender[]>(`${this.backendUrl}/${this.complementUrl}/get/${id}`);
  }
}
