import { Injectable } from '@angular/core';
import { ProductApiService } from './product.api.service';
import { Product } from '../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly _productApiService: ProductApiService) {}

  addProduct(product: Product) {
    const token = localStorage.getItem('authorization');
    return this._productApiService.addProduct(token ?? '', product);
  }

  deleteProduct(product: Product) {
    const token = localStorage.getItem('authorization');
    return this._productApiService.deleteProduct(token ?? '', product);
  }

  updateProduct(product: Product) {
    const token = localStorage.getItem('authorization');
    return this._productApiService.updateProduct(token ?? '', product);
  }

  getAllProducts() {
    const token = localStorage.getItem('authorization');
    return this._productApiService.getAllProducts(token ?? '');
  }

  getProductById(id: number): Observable<Product> {
    const token = localStorage.getItem('authorization');
    return this._productApiService.getProductById(token ?? '', id);
  }
}
