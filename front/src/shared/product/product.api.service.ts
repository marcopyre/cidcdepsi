import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addProduct(token: string, product: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  updateProduct(token: string, product: Product): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/product/${product.id}`, product, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  deleteProduct(token: string, product: Product): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/product/${product.id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  getAllProducts(token: string) {
    return this.http.get<any>(`${this.apiUrl}/product`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  getProductById(token: string, id: number) {
    return this.http.get<any>(`${this.apiUrl}/product/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
