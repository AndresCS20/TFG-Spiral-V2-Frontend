import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageTitleComponent } from '../../shared/elements/page-title/page-title.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule, PageTitleComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
