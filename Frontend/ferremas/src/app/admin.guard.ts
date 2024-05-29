import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();
  if (user && user.role === 'admin') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};

