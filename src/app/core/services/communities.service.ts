import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllCommunities, Community, CommunityCreate, CommunityUpdate, OneCommunity } from '@interfaces/communities.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
 
  constructor(private http: HttpClient) {}


  updateCommunity(shortname:string, community : CommunityUpdate): Observable<CommunityUpdate> {
    return this.http.patch<CommunityUpdate>(API_URL + 'community/' + shortname + '', community);
  }

  createCommunity(community: CommunityCreate): Observable<Community> {
    return this.http.post<Community>(API_URL + 'community', community);
  }

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
