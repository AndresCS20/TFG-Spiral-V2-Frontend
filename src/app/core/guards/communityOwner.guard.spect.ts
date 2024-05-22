import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommuniyDataService } from '@services/communiy-data.service';
import { StorageService } from '@services/storage.service';

export const communityOwner: CanActivateFn = async (route, state) => {
 const communityDataService = inject(CommuniyDataService);
 const router = inject(Router);

 const isOwner = await communityDataService.currentIsCommunityOwner.toPromise();
 console.log(isOwner);
 if (isOwner) {
   return true;
 } else {
   router.navigate(['/inicio']);
   return false;
 }
};

