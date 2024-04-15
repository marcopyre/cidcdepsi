import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../shared/modules/nav-bar/nav-bar.component';
import { ProductService } from '../../shared/product/product.service';
import { Product } from '../../shared/types';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavBarComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
  });

  groups: Product[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('authorization');
    if (token) {
      this.authService.isAdmin(token);
    }

    this.productService.getAllProducts().subscribe((products) => {
      this.groups = products;
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      if (
        this.productForm.controls.name.value &&
        this.productForm.controls.quantity.value
      ) {
        const product: Product = {
          name: this.productForm.controls.name.value,
          max: Number(this.productForm.controls.quantity.value),
          membres: [],
        };
        this.productService.addProduct(product).subscribe(() => {
          location.reload;
        });
      }
    }
  }
}
