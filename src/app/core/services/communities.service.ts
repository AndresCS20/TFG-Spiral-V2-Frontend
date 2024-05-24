import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllCommunities, Community, OneCommunity } from '@interfaces/communities.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
 
  constructor(private http: HttpClient) {}


  getCommunities(): Observable<AllCommunities> {
    return this.http.get<AllCommunities>(API_URL + 'community');
  }

  getOneCommunity(shortname: string): Observable<OneCommunity> {
    return this.http.get<OneCommunity>(API_URL + 'community/' + shortname);
  }

  checkIsCommunityMember(shortname: string, userId: string): Observable<any> {
    return this.http.post(API_URL + 'community/user/' + shortname + '/ismember', { userId });
  }

  checkIsCommunityOwner(shortname: string, userId: string): Observable<any> {
    return this.http.post(API_URL + 'community/user/' + shortname + '/isowner', { userId });
  }

  joinCommunity(shortname: string, userId: string): Observable<any> {
    return this.http.post(API_URL + 'community/user/' + shortname + '/join', { userId });
  }

  leaveCommunity(shortname: string, userId: string): Observable<any> {
    return this.http.delete(API_URL + 'community/user/' + shortname + '/leave', { body: { userId } });
  }
}
