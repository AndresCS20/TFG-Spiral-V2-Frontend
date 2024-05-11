import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss'
})
export class PageTitleComponent {

  @Input() title! : string;
  @Input() subtitle! : string;
  @Input() icon! : string;
  @Input() button? : string;
  @Input() buttonLink? : string;
  @Input() buttonIcon? : string;
  @Input() image! : string;

}
