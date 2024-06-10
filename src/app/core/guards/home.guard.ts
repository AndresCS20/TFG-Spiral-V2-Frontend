import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '@services/storage.service';

export const homeGuard: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const userIsLoggedIn = storageService.isLoggedIn(); 
  const router = inject(Router);

    if (userIsLoggedIn) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  

};



