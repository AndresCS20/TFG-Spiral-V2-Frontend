import { Injectable } from '@angular/core';
import { Publication } from '@interfaces/publications.interface';
import { User } from '@interfaces/users.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExploreDataService {
  constructor() {}

  private meetPeopleList = new BehaviorSubject<User[] | null>(null);
  currentMeetPeopleList = this.meetPeopleList.asObservable();

  private globalPublications = new BehaviorSubject<Publication[] | null>(null);
  currentGlobalpublications = this.globalPublications.asObservable();


  changeGlobalPublicationsList(publications: Publication[]) {
    this.globalPublications.next(publications);
  }

  changeMeetPeopleList(users: User[]) {
    this.meetPeopleList.next(users);
  }
}
