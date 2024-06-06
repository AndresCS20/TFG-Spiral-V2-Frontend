import { Component, OnInit } from '@angular/core';
import { AllPublicationsPaginated, Publication } from '@interfaces/publications.interface';
import { ProfileDataService } from '@services/data/profile-data.service';
import { PublicationsService } from '@services/publications.service';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit{

  public publications: Publication[] = [];
  username = ''
  isLoading = true
  limit = 20
  page = 1
  nextPage : number | null = null
  totalPages = 0
  constructor(
    private profileDataService: ProfileDataService,
    private publicationsService: PublicationsService
  ) { }

  ngOnInit(): void {
    console.log("AQUI ENTRO")
    this.profileDataService.currentUsername.subscribe(username => {
      console.log("AQUI TAMBIEN",username)
      if (username) {
        this.username = username
        this.getMyPublications()
      }
    });
  }

  private getMyPublications() {
    this.publicationsService.getUserPublications(this.username, this.page, this.limit).subscribe({
      next: (publications: AllPublicationsPaginated) => {
        this.publications = [...this.publications, ...publications.body]
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
      this.getMyPublications()
  }
  }


}
