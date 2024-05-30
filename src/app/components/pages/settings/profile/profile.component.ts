import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarFrameComponent } from 'src/app/components/shared/elements/avatar-frame/avatar-frame.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AvatarFrameComponent,FormsModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  interests = signal([])
  interestInput : string = ''
  constructor() { }

  ngOnInit(): void { }

  addInterest(){
    console.log(this.interestInput)
  }


}
