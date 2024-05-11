import { Component } from '@angular/core';
import { CommunityBoxComponent } from '../../shared/elements/community-box/community-box.component';
import { PageTitleComponent } from '../../shared/elements/page-title/page-title.component';

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [CommunityBoxComponent, PageTitleComponent],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.scss'
})
export class CommunitiesComponent {
  numbers = Array.from({length: 11}, (_, i) => i);

}
