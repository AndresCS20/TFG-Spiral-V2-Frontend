import { Component } from '@angular/core';
import { UserzoneComponent } from '../../shared/layout/userzone/userzone.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [UserzoneComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
