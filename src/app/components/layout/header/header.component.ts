import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserzoneComponent } from '../../shared/layout/userzone/userzone.component';
import { StorageService } from '@services/storage.service';
import { EventBusService } from '@shared/event-bus.service';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';
import { AvatarFrameComponent } from '../../shared/elements/avatar-frame/avatar-frame.component';
import { CreatePublicationModalComponent } from '../../shared/elements/create-publication-modal/create-publication-modal.component';
import { OneUser, User } from '@interfaces/users.interface';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,UserzoneComponent, AvatarFrameComponent, CreatePublicationModalComponent, LanguageSelectorComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{


  constructor(
    private storageService: StorageService, 
    private authService: AuthService ,
    private eventBusService: EventBusService, 
    private userService: UserService,  
  ) { }
  screenfull = false;
  isLoggedIn = false;
  eventBusSub?: Subscription;
  userStorage !: User;
  userInfo !: User;
  
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      this.userStorage = this.storageService.getUser();
    }

    if(this.userStorage){
      this.getUserInfo(this.userStorage.username);
     if(this.userInfo){
        console.log("userinfo",this.userInfo)
      }
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }

  private getUserInfo (username:string){
    this.userService.getOneUser(username).subscribe({
    next: (user: OneUser) => {
      this.userInfo = user.body;
      console.log("oneuser",this.userInfo)
    },
    error: (error) => {
      console.log(error);
    }
      
  })
    }
  
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
