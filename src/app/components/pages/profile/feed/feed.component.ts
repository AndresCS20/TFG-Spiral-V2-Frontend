import { Component } from '@angular/core';
import { Publication } from '@interfaces/publications.interface';
import { ProfileDataService } from '@services/data/profile-data.service';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {

  public publications: Publication[] = [];
  constructor(
    private profileDataService: ProfileDataService,
  ) { }

  ngOnInit(): void {
    this.profileDataService.currentProfilePublications.subscribe(publications => {
      if (publications) {
        this.publications = publications;
        console.log("PUBLICACIONES USUARIO",this.publications);
      }
    });
  }

}
