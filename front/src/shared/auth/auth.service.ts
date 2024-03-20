import { Injectable } from '@angular/core';
import { AuthApiService } from './auth.api.service';
import { Observable, firstValueFrom, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly _authApiService: AuthApiService) {}
  
  async isAdmin(token: string) {
    return await firstValueFrom(
      this._authApiService.isAdmin(token).pipe(timeout(10000))
    );
  }

  isAdminObservable(token: string): Observable<any> {
    return this._authApiService.isAdmin(token)
  }
}
