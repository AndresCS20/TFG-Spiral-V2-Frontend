import { Component } from '@angular/core';
import { PublicationComponent } from 'src/app/components/shared/elements/publication/publication.component';

@Component({
  selector: 'app-global-posts',
  standalone: true,
  imports: [PublicationComponent],
  templateUrl: './global-posts.component.html',
  styleUrl: './global-posts.component.scss'
})
export class GlobalPostsComponent {

  numbers = Array.from({length: 11}, (_, i) => i);
}
