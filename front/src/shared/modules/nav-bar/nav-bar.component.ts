import {
  GoogleSigninButtonModule,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [GoogleSigninButtonModule, ReactiveFormsModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  constructor(
    private readonly _router: Router,
    private readonly _authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}
  innerWidth: any;
  drawerOpened = false;
  socialUser!: SocialUser;
  isLoggedin = false;
  isAdmin = false;
  cartSize = 0;

  searchControl = new FormControl('');

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.isLoggedin = !!localStorage.getItem('authorization');

    const researchValue = this.activatedRoute.snapshot.params['research'];
    if (researchValue) {
      this.searchControl.setValue(researchValue);
    }

    const token = localStorage.getItem('authorization');
    if (token) {
      this._authService.isAdminObservable(token).subscribe((response) => {
        this.isAdmin = response.message === 'user id admin';
      });
    }

    this.fetchCart();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  toggleDrawer() {
    this.drawerOpened = !this.drawerOpened;
  }

  navigateHome() {
    this._router.navigate(['']);
  }

  navigateAdmin() {
    this._router.navigate(['/back-office']);
  }

  login() {
    window.location.href = 'http://localhost:3000/auth/google';
  }

  logout() {
    localStorage.removeItem('authorization');
    window.location.reload();
  }

  search() {
    this._router
      .navigate(['/search', { research: this.searchControl.value }])
      .then(() => {
        if (this._router.url.includes('search')) {
          window.location.reload();
        }
      });
  }

  fetchCart() {
    const cart = localStorage.getItem('cart');
    let cartContent: { quantity: number; id: number }[] = [];
    if (cart) {
      cartContent = JSON.parse(cart);
      this.cartSize = cartContent.length;
    }
  }
}
