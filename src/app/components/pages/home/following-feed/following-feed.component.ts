import { Component, OnInit } from '@angular/core';
import { Publication } from '@interfaces/publications.interface';
import { HomeDataService } from '@services/data/home-data.service';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-following-feed',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './following-feed.component.html',
  styleUrl: './following-feed.component.scss'
})
export class FollowingFeedComponent implements OnInit {

  followingPublications!: Publication[]

  constructor(private homeDataService: HomeDataService) { }

  ngOnInit(): void {
    this.homeDataService.currentFollowingPublications.subscribe(publications => {
      if (publications) {
        this.followingPublications = publications
      }
    })
  }
}
