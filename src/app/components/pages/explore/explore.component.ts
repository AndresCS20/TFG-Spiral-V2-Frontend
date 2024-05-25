import { Component, OnInit } from '@angular/core';
import { PageTitleComponent } from '../../shared/elements/page-title/page-title.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PublicationsService } from '@services/publications.service';
import { ExploreDataService } from '@services/data/explore-data.service';
import { AllPublications } from '@interfaces/publications.interface';
import { StorageService } from '@services/storage.service';
import { AllUsers, User } from '@interfaces/users.interface';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [PageTitleComponent, RouterOutlet, RouterModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {
  private user!: User;
  constructor(
    private userService: UserService,
    private publicationsService: PublicationsService, 
    private exploreDataService: ExploreDataService, 
    private storageService: StorageService) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.getGlobalPublications(this.user.username);
    this.getMeetPeopleList(this.user.username);
  }

  private getGlobalPublications(username:string): void {
    this.publicationsService.getGlobalPublications("sete").subscribe({
      next: (data: AllPublications) => {
        this.exploreDataService.changeGlobalPublicationsList(data.body);
      },
      error: (error : any) => {
        console.log(error);
      }
    })
  }

  private getMeetPeopleList(username:string): void {
    this.userService.getGlobalUsers(username).subscribe({
      next: (data: AllUsers) => {
        this.exploreDataService.changeMeetPeopleList(data.body);
      },
      error: (error: any) => {
        console.log(error)
      }
    })


  }
}
