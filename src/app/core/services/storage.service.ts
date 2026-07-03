import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

export interface UserPublic {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  profile_picture?: string;
  banner_picture?: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: UserPublic): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserPublic | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as UserPublic;
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
