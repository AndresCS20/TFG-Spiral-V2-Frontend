import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AvatarFrameComponent } from '../../shared/elements/avatar-frame/avatar-frame.component';
import { UserService } from '@services/user.service';
import { AllUsers, OneUser, User } from '@interfaces/users.interface';
import { AboutComponent } from './about/about.component';
import { ProfileDataService } from '@services/data/profile-data.service';
import { Subscription } from 'rxjs';
import { AllPublications } from '@interfaces/publications.interface';
import { PublicationsService } from '@services/publications.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, AvatarFrameComponent, AboutComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy{
  currentUser!: User;
  username!: string | null;
  private routeSub!: Subscription;
  loggedUser!: User;
  constructor(private storageService: StorageService, 
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private profileDataService:ProfileDataService,
    private storage : StorageService,
    private _publicationService: PublicationsService  
  ) 
    { }

  // ngOnInit(): void {
  //   this.currentUser = this.storageService.getUser();
  //   let route = this.route;
  //   while (route.firstChild) route = route.firstChild;
  //   this.username = route.snapshot.paramMap.get('username');

  //   if (this.username) {
  //       this.getUser(this.username);
  //   }
  // }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.subscribeToRouteParams();
  }

  private subscribeToRouteParams(): void {
    this.routeSub = this.route.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      if (this.username) {
        this.getUser(this.username);
        console.log("USERNAMEPARAM", this.username);
        console.log("CURRENTUSER", this.currentUser.username);
        this.profileDataService.changeUsername(this.username);
        this.getPublications(this.username);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  private getPublications(username: string) {
    this._publicationService.getUserPublications(username).subscribe({
      next: (data: AllPublications) => {
        this.profileDataService.changeProfilePublications(data.body);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  private getUser(username: string) {
    console.log("hola mundo",username)
    this._userService.getOneUser(username).subscribe({
      next: (data: OneUser) => {
        this.currentUser = data.body;
        this.profileDataService.changeUserProfile(this.currentUser);
        console.log(this.currentUser);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
