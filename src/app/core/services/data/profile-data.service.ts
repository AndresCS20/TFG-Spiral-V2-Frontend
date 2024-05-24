import { Injectable } from '@angular/core';
import { Community } from '@interfaces/communities.interface';
import { AllPublications, Publication } from '@interfaces/publications.interface';
import { CommunityList, User } from '@interfaces/users.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  constructor() {}
  private username = new BehaviorSubject<string>('');
  currentUsername = this.username.asObservable();

  private userProfile = new BehaviorSubject<User | null>(null);
  currentUserProfile = this.userProfile.asObservable();

  private followers = new BehaviorSubject<User[] | null>(null); 
  currentFollowers = this.followers.asObservable();

  private following = new BehaviorSubject<User[] | null>(null);
  currentFollowing = this.following.asObservable();

  private profilePublications = new BehaviorSubject<Publication[] | null>(null);
  currentProfilePublications = this.profilePublications.asObservable();

  private profileCommunities = new BehaviorSubject<CommunityList[] | null>(null);
  currentProfileCommunities = this.profileCommunities.asObservable();

  changeProfileCommunities(communities: CommunityList[]) {
    console.log("PEPEPEPEPEP",communities);
    this.profileCommunities.next(communities);
  }
  
 changeProfilePublications(publications: Publication[]) {
    this.profilePublications.next(publications);
  }

  changeUsername(username: string) {
    this.username.next(username);
  }
  changeFollowers(followers: User[]) {
    this.followers.next(followers);
  }

  changeFollowing(following: User []) {
    this.following.next(following)
  }

  changeUserProfile(user: User) {
    this.userProfile.next(user);
  }
}
