import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserzoneComponent } from '../../shared/layout/userzone/userzone.component';
import { StorageService } from '@services/storage.service';
import { EventBusService } from '@shared/event-bus.service';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,UserzoneComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{


  constructor(private storageService: StorageService, private authService: AuthService ,private eventBusService: EventBusService) { }

  isLoggedIn = false;
  eventBusSub?: Subscription;
  user : any;
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.user = this.storageService.getUser();
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }



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
