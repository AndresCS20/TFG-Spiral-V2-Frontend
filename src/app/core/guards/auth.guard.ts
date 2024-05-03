import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);

  const userIsLoggedIn = storageService.isLoggedIn(); 

  const router = inject(Router);
  if (userIsLoggedIn) {
    router.navigate(['home']); // Redirige al usuario a la página de inicio
    return false;
  } else {
    return true;
  }
  
};



