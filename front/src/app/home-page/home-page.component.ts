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

  isAdmin = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((products) => {
      this.groups = products;
    });

    if (localStorage.getItem('authorization')) {
      this.isAdmin = true;
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
          max: Number(this.productForm.controls.quantity.value),
          membres: [],
        };
        this.productService.addProduct(product).subscribe(() => {
          location.reload;
        });
      }
    }
  }

  apply(event: string, group: Product) {
    if (group.max > group.membres.length) {
      group.membres = group.membres.concat(event);
      if (group.id) {
        this.productService.updateProduct(group).subscribe(() => {
          location.reload;
        });
      }
    }
  }

  deleteUserFromGroup(event: string, group: Product) {
    group.membres = group.membres.filter((membre) => membre !== event);
    if (group.id) {
      this.productService.updateProduct(group).subscribe(() => {
        location.reload;
      });
    }
  }

  deleteGroup(group: Product) {
    this.productService.deleteProduct(group).subscribe(() => {
      location.reload;
    });
  }
}
