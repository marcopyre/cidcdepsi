import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  isAdmin(token: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/isAdmin`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }),
    });
  }
}
