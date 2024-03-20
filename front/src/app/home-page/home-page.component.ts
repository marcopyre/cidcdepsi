import { Component } from '@angular/core';
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
export class HomePageComponent {
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+(.[0-9]{1,2})?'),
    ]),
    description: new FormControl(''),
    quantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
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
        this.productForm.controls.description.value &&
        this.productForm.controls.price.value &&
        this.productForm.controls.quantity.value
      ) {
        const product: Product = {
          name: this.productForm.controls.name.value,
          description: this.productForm.controls.description.value,
          price: Number(this.productForm.controls.price.value),
          quantity: Number(this.productForm.controls.quantity.value),
          pictures: this.pictures,
        };
        this.productService.addProduct(product).subscribe(() => {
          this.productForm.reset();
          this.pictures = [];
        });
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64string = reader.result as string;
      this.pictures.push(base64string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  removePicture(picture: string) {
    this.pictures = this.pictures.filter(
      (pictureFromArray) => pictureFromArray !== picture
    );
  }
}
