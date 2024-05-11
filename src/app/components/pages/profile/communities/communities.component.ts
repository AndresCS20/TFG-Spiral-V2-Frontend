import { Component } from '@angular/core';
import { CommunityBoxComponent } from 'src/app/components/shared/elements/community-box/community-box.component';

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [CommunityBoxComponent],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.scss'
})
export class CommunitiesComponent {
  numbers = Array.from({length: 11}, (_, i) => i);
}
