import { Component } from '@angular/core';

@Component({
  selector: 'app-create-publication-modal',
  standalone: true,
  imports: [],
  templateUrl: './create-publication-modal.component.html',
  styleUrl: './create-publication-modal.component.scss'
})
export class CreatePublicationModalComponent {

  publicationType = 'text'
}
