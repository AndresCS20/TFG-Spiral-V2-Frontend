import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommunitiesService } from '@services/communities.service';
import { CommuniyDataService } from '@services/data/communiy-data.service';
import { StorageService } from '@services/storage.service';
import { catchError, map, of } from 'rxjs';

export const ownerCommunity: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const router = inject(Router);
  const communityService = inject(CommunitiesService);

  const userIsLoggedIn = storageService.isLoggedIn(); 
  const userId = storageService.getUser()._id;
  const shortname = route.paramMap.get('shortname');
  // alert("shortname: " + shortname);
  // alert("userId: " + userId);
  if (!shortname || !userId) {
   return false;
 }

 // if (userIsLoggedIn) {
 //   return true;
 // } else {
 //   router.navigate(['/login']);
 //   return false;
 // }

 return communityService.checkIsCommunityOwner(shortname, userId).pipe(
  map(response => {
    if (response.status === 'success') {
      return true;
    } else {
      router.navigate(['/community', shortname,'/feed']);
      return false;
    }
  }),
  catchError(error => {
    router.navigate(['/communities']);
    return of(false);
  })
);
  

};

