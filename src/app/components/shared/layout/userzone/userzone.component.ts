import { Component, Input, OnInit } from '@angular/core';
import { AvatarFrameComponent } from '../../elements/avatar-frame/avatar-frame.component';
import { StorageService } from '@services/storage.service';
import { RouterLink } from '@angular/router';
import { User } from '@interfaces/users.interface';

@Component({
  selector: 'app-userzone',
  standalone: true,
  imports: [AvatarFrameComponent, RouterLink],
  templateUrl: './userzone.component.html',
  styleUrl: './userzone.component.scss'
})
export class UserzoneComponent implements OnInit{
  @Input() user: any;
  userStorage !: User
  isLoading = true
  profileUrl = '/profile/';
  constructor(private storageService: StorageService){}
  ngOnInit(): void {
    this.userStorage = this.storageService.getUser();
    if(this.userStorage){
      // this.user = this.userStorage;
      this.isLoading = false;
      this.profileUrl += this.userStorage.username;

    }
    // this.profileUrl += this.user.username;
  }
  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }

}
