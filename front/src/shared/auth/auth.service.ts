import { Injectable } from '@angular/core';
import { User } from '../types';
import { AuthApiService } from './auth.api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly _authApiService: AuthApiService,
    private readonly _router: Router
  ) {}

  authenticate(user: User) {
    return this._authApiService.authenticate(user).subscribe((token) => {
      localStorage.setItem('authorization', token.access_token);
      this._router.navigate(['/']);
    });
  }
}
