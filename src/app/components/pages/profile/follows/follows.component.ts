import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { FollowInfo, FollowList, FollowUser } from '@interfaces/follows.interface';
import { User } from '@interfaces/users.interface';
import { ProfileDataService } from '@services/data/profile-data.service';
import { UserService } from '@services/user.service';
import { UserBoxComponent } from 'src/app/components/shared/elements/user-box/user-box.component';
@Component({
  selector: 'app-follows',
  standalone: true,
  imports: [UserBoxComponent],
  templateUrl: './follows.component.html',
  styleUrl: './follows.component.scss'
})
export class FollowsComponent implements OnInit{
  urlSegment !: string;
  numbers = Array.from({length: 11}, (_, i) => i);
  follows!: FollowUser[];
  username!: string;

  constructor(private router: Router, private route: ActivatedRoute,private _userService: UserService, private _profileDataService: ProfileDataService, private destroyRef: DestroyRef) {
    this.urlSegment = this.getLastSegmentOfUrl();
    console.log(this.urlSegment);
    this.username = this.route.snapshot.paramMap.get('username') || '';
  }

  ngOnInit(): void {
    this._profileDataService.currentUsername.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(username => {
      if (username) {
        this.username = username;
      }
    });
    this.getFollows(this.username,this.urlSegment);
  }

  private getLastSegmentOfUrl(): string {
    const urlSegments = this.router.url.split('/');
    return urlSegments[urlSegments.length - 1];
  }
  
  private getFollows(username: string, followType: string): void {

    this._userService.getFollows(username, followType).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
    // this._userService.getFollows(username, followType).subscribe((data) => {
      next: (data: FollowList) => {
        this.follows = data.body.map(followInfo => followInfo.user);
        console.log("PEPEPEPEPEP",data);
      },
      error: (error) => {
        console.log(error);
      },
    })
  }

}


