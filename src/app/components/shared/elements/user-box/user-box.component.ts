import { Component, Input } from '@angular/core';
import { AvatarFrameComponent } from '../avatar-frame/avatar-frame.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-box',
  standalone: true,
  imports: [AvatarFrameComponent, CommonModule, RouterLink],
  templateUrl: './user-box.component.html',
  styleUrl: './user-box.component.scss'
})
export class UserBoxComponent {

  @Input() user : any;
  @Input() communityMemberDate?: Date
}
