import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AllUsers, OneUser } from '@interfaces/users.interface';
import { FollowList } from '@interfaces/follows.interface';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  
  getAllUsers(): Observable<AllUsers> {
    return this.http.get<AllUsers>(API_URL + 'user');
  }

  getOneUser(username: string): Observable<OneUser> {
    return this.http.get<OneUser>(API_URL + 'user/' + username);
  }

  getFollows(username : string, followType:string): Observable<FollowList> {
    return this.http.get<FollowList>(API_URL + 'user/' + username + '/'+followType);
  }
  
 
}
