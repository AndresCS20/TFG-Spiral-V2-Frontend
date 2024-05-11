import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../core/services/storage.service';
import { RouterModule } from '@angular/router';
import { AvatarFrameComponent } from '../../shared/elements/avatar-frame/avatar-frame.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, AvatarFrameComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  currentUser: any;


  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
