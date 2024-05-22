import { Injectable } from '@angular/core';
import { Community } from '@interfaces/communities.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommuniyDataService {
  constructor() {}
  private isCommunityOwner = new BehaviorSubject<boolean | null>(null);
  private communitySource = new BehaviorSubject<Community | null>(null);
  currentCommunity = this.communitySource.asObservable();
  currentIsCommunityOwner = this.isCommunityOwner.asObservable();
  changeCommunity(community: Community) {
    this.communitySource.next(community);
  }
  changeIsCommunityOnwner(isOwner: boolean) {
    this.isCommunityOwner.next(isOwner);
  }
}
