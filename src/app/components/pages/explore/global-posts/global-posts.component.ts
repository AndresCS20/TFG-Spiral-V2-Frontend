import { Component, OnInit } from '@angular/core';
import { AllPublicationsPaginated, Publication } from '@interfaces/publications.interface';
import { User } from '@interfaces/users.interface';
import { ExploreDataService } from '@services/data/explore-data.service';
import { PublicationsService } from '@services/publications.service';
import { StorageService } from '@services/storage.service';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-global-posts',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './global-posts.component.html',
  styleUrl: './global-posts.component.scss'
})
export class GlobalPostsComponent implements OnInit{

  globalPublications : Publication[] = [];
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
      this.getGlobalPublications()
    }
    // this.exploreDataService.currentGlobalpublications.subscribe(publications =>{
    //   if(publications){
    //     console.log(publications)
    //     this.globalPublications = publications;
    //   }
    // })
  }

  private getGlobalPublications() {
    this.publicationsService.getGlobalPublications(this.currentUser.username, this.page, this.limit).subscribe({
      next: (publications: AllPublicationsPaginated) => {
        this.globalPublications = [...this.globalPublications, ...publications.body]
        this.nextPage = publications.pagination.nextPage
        this.totalPages = publications.pagination.totalPages
        if(this.nextPage !== null) {
          this.page = this.nextPage
        }
        // this.page = this.nextPage === null ? this.page : publications.pagination.nextPage
        // this.homeDataService.changeFollowingPublications(this.followingPublications)
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
      this.getGlobalPublications()
  }
  }

  
}
