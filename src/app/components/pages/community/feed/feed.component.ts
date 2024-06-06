import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllPublications, AllPublicationsPaginated, Publication } from '@interfaces/publications.interface';
import { User } from '@interfaces/users.interface';
import { PublicationsService } from '@services/publications.service';
import { StorageService } from '@services/storage.service';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  
  

  communityShortName!: string | null;
  publications: Publication[] = []
  currentUser !: User
  isLoading = true
  limit = 20
  page = 1
  nextPage : number | null = null
  totalPages = 0

  constructor(private route: ActivatedRoute, private _publicationsService: PublicationsService, private storageService:StorageService) { }

  ngOnInit(): void {
    
    let route = this.route;
    while (route.firstChild) route = route.firstChild;
    this.communityShortName = route.snapshot.paramMap.get('shortname');
    console.log(this.communityShortName);
    if(this.communityShortName) {
      this.getCommunityPublications(this.communityShortName);
    }
  }

  private getCommunityPublications(shortname: string) {
    this._publicationsService.getCommunityPublications(shortname, this.page, this.limit).subscribe({
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
        console.log(error);
      }
    })
  }

  loadMorePublications() {
    if(this.nextPage !== null) {
      this.isLoading = true;
      if(this.communityShortName) {
        this.getCommunityPublications(this.communityShortName);
      }
    }
  }

}
