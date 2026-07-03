import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommunitiesService } from '@services/communities.service';
import { CommuniyDataService } from '@services/data/communiy-data.service';
import { StorageService } from '@services/storage.service';
import { User } from '@interfaces/users.interface';
import { catchError, map, of } from 'rxjs';

export const ownerCommunity: CanActivateFn = (route, state) => {

  const storageService = inject(StorageService);
  const router = inject(Router);
  const communityService = inject(CommunitiesService);

  const userIsLoggedIn = storageService.isLoggedIn(); 
  const user = storageService.getUser()! as unknown as User;
  const shortname = route.paramMap.get('shortname');
  if (!shortname || !user?._id) {
   return false;
 }
 const userId = user._id;

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

