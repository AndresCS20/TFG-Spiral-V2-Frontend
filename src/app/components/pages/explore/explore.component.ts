import { Component } from '@angular/core';
import { PageTitleComponent } from '../../shared/elements/page-title/page-title.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [PageTitleComponent, RouterOutlet, RouterModule],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {

}
