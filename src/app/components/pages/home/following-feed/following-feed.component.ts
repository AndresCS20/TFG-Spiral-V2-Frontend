import { Component, OnInit } from '@angular/core';
import { AllPublicationsPaginated, Publication } from '@interfaces/publications.interface';
import { User } from '@interfaces/users.interface';
import { HomeDataService } from '@services/data/home-data.service';
import { PublicationsService } from '@services/publications.service';
import { StorageService } from '@services/storage.service';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-following-feed',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './following-feed.component.html',
  styleUrl: './following-feed.component.scss'
})
export class FollowingFeedComponent implements OnInit {

  followingPublications : Publication[] = []
  currentUser !: User
  isLoading = true
  limit = 20
  page = 1
  nextPage : number | null = null
  totalPages = 0

  constructor(private publicationsService: PublicationsService, private storageService:StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser()
    if(this.currentUser) {
      this.getFollowingPublications()
    }
    // this.homeDataService.currentFollowingPublications.subscribe(publications => {
    //   if (publications) {
    //     this.followingPublications = publications
    //     this.isLoading = false
    //   }
    // })
  }

  private getFollowingPublications() {
    this.publicationsService.getFollowingPublicationsPaginated(this.currentUser.username, this.page, this.limit).subscribe({
      next: (publications: AllPublicationsPaginated) => {
        this.followingPublications = [...this.followingPublications, ...publications.body]
        this.nextPage = publications.pagination.nextPage
        this.totalPages = publications.pagination.totalPages
        if(this.nextPage !== null) {
          this.page = this.nextPage
        }
        this.isLoading = false
      },
      error: (error) => {
        console.error(error)
        this.isLoading = false
      }
    })
  }

  loadMorePublications() {
    
    if(this.nextPage !== null) {
      this.isLoading = true
      this.getFollowingPublications()
  }
  }

}
