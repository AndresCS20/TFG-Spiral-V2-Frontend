import { Component } from '@angular/core';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {

}
