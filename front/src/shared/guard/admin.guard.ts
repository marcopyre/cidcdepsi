import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

export const isAdminGuard: CanActivateFn = async (route, state) => {
    const router: Router = inject(Router);

    const token = localStorage.getItem('authorization');
    if(token){
        const userRole = await inject(AuthService).isAdmin(token);
        if(userRole.message === "user id admin"){
            return true
        }
        else {
            return router.navigate(['']).then();
        }
    }

    return router.navigate(['']).then();
};