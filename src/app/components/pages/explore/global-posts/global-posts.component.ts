import { Component, OnInit } from '@angular/core';
import { Publication } from '@interfaces/publications.interface';
import { ExploreDataService } from '@services/data/explore-data.service';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-global-posts',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './global-posts.component.html',
  styleUrl: './global-posts.component.scss'
})
export class GlobalPostsComponent implements OnInit{

  numbers = Array.from({length: 11}, (_, i) => i);
  globalPublications !: Publication[];

  constructor(private exploreDataService: ExploreDataService){}

  ngOnInit(): void {
    this.exploreDataService.currentGlobalpublications.subscribe(publications =>{
      if(publications){
        console.log(publications)
        this.globalPublications = publications;
      }
    })
  }

  
}
