import { Component, Input } from '@angular/core';
import { AvatarFrameComponent } from '../avatar-frame/avatar-frame.component';

@Component({
  selector: 'app-user-box',
  standalone: true,
  imports: [AvatarFrameComponent],
  templateUrl: './user-box.component.html',
  styleUrl: './user-box.component.scss'
})
export class UserBoxComponent {

  @Input() user : any;

}
