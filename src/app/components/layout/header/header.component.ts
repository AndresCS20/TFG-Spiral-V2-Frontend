import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserzoneComponent } from '../../shared/layout/userzone/userzone.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,UserzoneComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  screenfull = false;
  collapseSidebar() {
  document.body.classList.toggle('collapsed');
  }

  fullscreen() {
  
    if (document.fullscreenElement) {
      this.screenfull = false;
      document.exitFullscreen();
    } else {
      this.screenfull = true;
      document.documentElement.requestFullscreen();
    }

  }
}
