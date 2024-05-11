import { Component } from '@angular/core';
import { PageTitleComponent } from '../../shared/elements/page-title/page-title.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [PageTitleComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent {

}
