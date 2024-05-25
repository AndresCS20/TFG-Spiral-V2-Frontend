import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserzoneComponent } from '../../shared/layout/userzone/userzone.component';
import { StorageService } from '@services/storage.service';
import { EventBusService } from '@shared/event-bus.service';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';
import { AvatarFrameComponent } from '../../shared/elements/avatar-frame/avatar-frame.component';
import { CreatePublicationModalComponent } from '../../shared/elements/create-publication-modal/create-publication-modal.component';
import { User } from '@interfaces/users.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,UserzoneComponent, AvatarFrameComponent, CreatePublicationModalComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{


  constructor(private storageService: StorageService, private authService: AuthService ,private eventBusService: EventBusService) { }

  isLoggedIn = false;
  eventBusSub?: Subscription;
  user !: User;
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
    this.storageService.clean();
    window.location.reload();
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
