import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllPublications, AllPublicationsPaginated, OnePublication, Publication, PublicationCreator } from '@interfaces/publications.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const API_URL = environment.API_URL;

@Injectable({
 providedIn: 'root'
})
export class PublicationsService {
 
 constructor(private http: HttpClient) {}

 getFollowingPublicationsPaginated(username: string, page: number, limit: number): Observable<AllPublicationsPaginated> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());

  return this.http.get<AllPublicationsPaginated>(API_URL + 'publication/' + username + '/following', { params });
}

 addReaction(publicationId: string, body:{userId: string, reactionType:string}): Observable<OnePublication> {
  return this.http.post<OnePublication>(API_URL + 'publication/' + publicationId + '/reactions/',body);
 }

 deleteReaction(publicationId: string, userId: string, reactionId:string): Observable<OnePublication> {
  return this.http.delete<OnePublication>(API_URL + 'publication/' + publicationId + '/reactions/'+reactionId, {body: {userId: userId}});
  
 }

 createPublication(publication: PublicationCreator) {
  return this.http.post<OnePublication>(API_URL + 'publication/', publication);
 }

 createComment(publicationId:string,body: { userId: string, content: string }): Observable<OnePublication> {
  return this.http.post<OnePublication>(API_URL + 'publication/'+publicationId+'/comments/', body);
 }

 getPublicationById(publicationId: string): Observable<OnePublication> {
  return this.http.get<OnePublication>(API_URL + 'publication/one/' + publicationId);
 }

 getAllPublications(page: number, limit: number): Observable<AllPublicationsPaginated> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
  return this.http.get<AllPublicationsPaginated>(API_URL + 'publication/', { params });
 }
 getCommunityPublications(communityShortname: string, page: number, limit: number): Observable<AllPublicationsPaginated> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
  return this.http.get<AllPublicationsPaginated>(API_URL + 'publication/' + communityShortname, { params });
 }

 getUserPublications(username: string, page: number, limit: number): Observable<AllPublicationsPaginated> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
  return this.http.get<AllPublicationsPaginated>(API_URL + 'publication/user/' + username, { params });
 }

 getFollowingPublications(username: string): Observable<AllPublications> {
  return this.http.get<AllPublications>(API_URL + 'publication/' + username + '/following');
 }

 getUserCommunitiesPublications(username: string, page: number, limit: number): Observable<AllPublicationsPaginated> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
  return this.http.get<AllPublicationsPaginated>(API_URL + 'publication/' + username + '/communities', { params });
 }

 getGlobalPublications(username: string , page: number, limit: number): Observable<AllPublicationsPaginated> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString());
  return this.http.get<AllPublicationsPaginated>(API_URL + 'publication/'+username+'/global', { params });
 }


}
