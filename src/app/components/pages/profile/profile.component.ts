import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AvatarFrameComponent } from '../../shared/elements/avatar-frame/avatar-frame.component';
import { UserService } from '@services/user.service';
import { AllUsers, CommunityList, OneUser, User } from '@interfaces/users.interface';
import { AboutComponent } from './about/about.component';
import { ProfileDataService } from '@services/data/profile-data.service';
import { Subscription } from 'rxjs';
import { AllPublications } from '@interfaces/publications.interface';
import { PublicationsService } from '@services/publications.service';
import { Community } from '@interfaces/communities.interface';
import { CommonModule } from '@angular/common';
import { FollowsService } from '@services/follows.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, AvatarFrameComponent, AboutComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy{
  currentUser!: User;
  isFollowingUser: boolean = false;
  paramUser = signal({} as User);
  username!: string | null;
  private routeSub!: Subscription;
  loggedUser!: User;
  constructor(private storageService: StorageService, 
    private _userService: UserService,
    private _followService: FollowsService,
    private route: ActivatedRoute,
    private router: Router,
    private profileDataService:ProfileDataService,
    private storage : StorageService,
    private _publicationService: PublicationsService,  
  ) 
    { }

  ngOnInit(): void {
    this.subscribeToRouteParams();
  }

  private subscribeToRouteParams(): void {
    this.routeSub = this.route.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      this.currentUser = this.storage.getUser();
      console.log("quehay", this.currentUser)
      if (this.username) {
        this.getUser(this.username);
        this.profileDataService.changeUsername(this.username);
        // this.getPublications(this.username);
        console.log("paramUser", this.paramUser);
        console.log("currentUser", this.currentUser);
        // this.isFollowing(this.currentUser._id , this.paramUser()._id);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  followUser(){
    this._followService.followUser({userId: this.currentUser._id, followId: this.paramUser()._id}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.isFollowingUser = true;
        if(this.username){
            this.getUser(this.username);
        }
      },  
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  isFollowing(userId: string, followId: string){
    this._followService.checkIsFollowing({userId: userId, followId: followId}).subscribe({
      next: (data: any) => {
        this.isFollowingUser = data.result;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  unFollowUser(){
    this._followService.unFollowUser({userId: this.currentUser._id, followId: this.paramUser()._id}).subscribe({
      next: (data: any) => {
        console.log(data);
        this.isFollowingUser = false;
        if(this.username){
          this.getUser(this.username);
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }


  sendCommunities(communities: CommunityList[]) {
    this.profileDataService.changeProfileCommunities(communities);
  }
  // private getPublications(username: string) {
  //   this._publicationService.getUserPublications(username).subscribe({
  //     next: (data: AllPublications) => {
  //       this.profileDataService.changeProfilePublications(data.body);
  //     },
  //     error: (error: any) => {
  //       console.log(error);
  //     }
  //   })
  // }

  private getUser(username: string) {
    console.log("hola mundo",username)
    this._userService.getOneUser(username).subscribe({
      next: (data: OneUser) => {
        this.paramUser.set(data.body);
        this.profileDataService.changeUserProfile(this.paramUser());
        console.log(this.paramUser);
        if(this.paramUser().communities){
          this.sendCommunities(this.paramUser().communities);
        }

        this.isFollowing(this.currentUser._id, this.paramUser()._id);

      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
