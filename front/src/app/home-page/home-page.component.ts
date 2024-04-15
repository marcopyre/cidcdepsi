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

  pictures: string[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('authorization');
    if (token) {
      this.authService.isAdmin(token);
    }
  }

  addProduct() {
    if (this.productForm.valid) {
      if (
        this.productForm.controls.name.value &&
        this.productForm.controls.quantity.value
      ) {
        const product: Product = {
          name: this.productForm.controls.name.value,
          quantity: Number(this.productForm.controls.quantity.value),
        };
        this.productService.addProduct(product).subscribe(() => {
          this.productForm.reset();
          this.pictures = [];
        });
      }
    }
  }

  removePicture(picture: string) {
    this.pictures = this.pictures.filter(
      (pictureFromArray) => pictureFromArray !== picture
    );
  }
}
