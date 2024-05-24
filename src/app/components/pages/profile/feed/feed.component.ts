import { Component, OnInit } from '@angular/core';
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
export class FeedComponent implements OnInit{

  public publications: Publication[] = [];
  constructor(
    private profileDataService: ProfileDataService,
  ) { }

  ngOnInit(): void {
    console.log("AQUI ENTRO")
    this.profileDataService.currentProfilePublications.subscribe(publications => {
      console.log("AQUI TAMBIEN",publications)
      if (publications) {
        this.publications = publications;
        console.log("PUBLICACIONES USUARIO",this.publications);
      }
    });
  }

}
