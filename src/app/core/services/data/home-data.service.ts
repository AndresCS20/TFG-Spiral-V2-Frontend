import { Injectable } from '@angular/core';
import { Community } from '@interfaces/communities.interface';
import { AllPublications, Publication } from '@interfaces/publications.interface';
import { User } from '@interfaces/users.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeDataService {
  constructor() {}

  private followingPublications = new BehaviorSubject<Publication[] | null>(null);
  currentFollowingPublications = this.followingPublications.asObservable();
 
  private userCommunitiesPublications = new BehaviorSubject<Publication[] | null>(null);
  currentCommunitiesPublications = this.userCommunitiesPublications.asObservable();
  
 changeFollowingPublications(publications: Publication[]) {
    this.followingPublications.next(publications);
  }
 changeCommunitiesPublications(publications: Publication[]) {
    this.userCommunitiesPublications.next(publications);
  }
}
