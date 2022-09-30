import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl!: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/app/auth`, {
      username: username,
      password: password,
    });
  }

  register(username: string, password: string, email: string, name: string, phone: string): Observable<any> {
   
    return this.httpClient.post(`${this.baseUrl}/app/auth/add`, {
      username: username,
      password: password,
      email: email,
      name: name,
      phone: phone
    });
  }
}
