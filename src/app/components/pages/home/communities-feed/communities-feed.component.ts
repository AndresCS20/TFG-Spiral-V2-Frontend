import { Component, OnInit } from '@angular/core';
import { Publication } from '@interfaces/publications.interface';
import { HomeDataService } from '@services/data/home-data.service';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-communities-feed',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './communities-feed.component.html',
  styleUrl: './communities-feed.component.scss'
})
export class CommunitiesFeedComponent implements OnInit {

  communitiesPublications!: Publication[]

  constructor(private homeDataService: HomeDataService) { }

  ngOnInit(): void {
    this.homeDataService.currentCommunitiesPublications.subscribe(publications => {
      console.log("holai", publications)
      if (publications) {
        this.communitiesPublications = publications
      }
    })
  }
}