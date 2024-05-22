import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllPublications, Publication } from '@interfaces/publications.interface';
import { PublicationsService } from '@services/publications.service';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private _publicationsService: PublicationsService) { }
  
  communityShortName!: string | null;
  publications!: Publication[]
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
    this._publicationsService.getCommunityPublications(shortname).subscribe({
      next: (data: AllPublications) => {
        console.log(data);
        this.publications = data.body;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
