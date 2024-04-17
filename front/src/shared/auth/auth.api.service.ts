import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  authenticate(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
