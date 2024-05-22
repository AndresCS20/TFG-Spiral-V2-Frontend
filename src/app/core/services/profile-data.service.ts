import { Injectable } from '@angular/core';
import { Community } from '@interfaces/communities.interface';
import { User } from '@interfaces/users.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileDataService {
  constructor() {}
  private username = new BehaviorSubject<string>('');
  private userProfile = new BehaviorSubject<User | null>(null);
  private followers = new BehaviorSubject<User[] | null>(null);
  private following = new BehaviorSubject<User[] | null>(null);
  currentUsername = this.username.asObservable();
  currentFollowers = this.followers.asObservable();
  currentFollowing = this.following.asObservable();
  currentUserProfile = this.userProfile.asObservable();

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
