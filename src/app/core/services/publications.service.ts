import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllPublications, OnePublication, Publication, PublicationCreator } from '@interfaces/publications.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const API_URL = environment.API_URL;

@Injectable({
 providedIn: 'root'
})
export class PublicationsService {
 
 constructor(private http: HttpClient) {}

 createPublication(publication: PublicationCreator) {
  return this.http.post<PublicationCreator>(API_URL + 'publication/', publication);
 }

 getPublicationById(publicationId: string): Observable<OnePublication> {
  return this.http.get<OnePublication>(API_URL + 'publication/one/' + publicationId);
 }

 getAllPublications(): Observable<AllPublications> {
  return this.http.get<AllPublications>(API_URL + 'publication/');
 }
 getCommunityPublications(communityShortname: string):Observable<AllPublications> {
  return this.http.get<AllPublications>(API_URL + 'publication/' + communityShortname);
 }

 getUserPublications(username: string): Observable<AllPublications> {
  return this.http.get<AllPublications>(API_URL + 'publication/user/' + username);
 }

 getFollowingPublications(username: string): Observable<AllPublications> {
  return this.http.get<AllPublications>(API_URL + 'publication/' + username + '/following');
 }

 getUserCommunitiesPublications(username: string): Observable<AllPublications> {
  return this.http.get<AllPublications>(API_URL + 'publication/' + username + '/communities');
 }

 getGlobalPublications(username: string): Observable<AllPublications> {
  return this.http.get<AllPublications>(API_URL + 'publication/'+username+'/global');
 }


}
