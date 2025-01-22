import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AllUsers, OneUser, UpdateUser, User } from '@interfaces/users.interface';
import { FollowList } from '@interfaces/follows.interface';

const API_URL = process.env.API_URL;

@Injectable({
  providedIn: 'root',
})
export class FollowsService {
  constructor(private http: HttpClient) {}

  checkIsFollowing(body: { userId: string, followId: string }): Observable <any>{
    console.log("body", body);
    return this.http.post(`${API_URL}follow/isfollowing/`, body);
  }

  followUser(body: { userId:string, followId: string }): Observable <any>{
    return this.http.post(`${API_URL}follow/`, body);
  }

  unFollowUser(body: { userId:string, followId: string }): Observable <any>{
    return this.http.delete(`${API_URL}follow/`, { body: body });
  }
  
 
}
