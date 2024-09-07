import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserModel } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private backendUrl: string;
  private complementUrl: string;

  constructor(private httpClient: HttpClient) {
    this.backendUrl = 'http://localhost:8000';
    this.complementUrl = 'user';
  }

  public getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.backendUrl}/${this.complementUrl}/all`);
  }
}
