import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserBoxComponent } from 'src/app/components/shared/elements/user-box/user-box.component';
@Component({
  selector: 'app-follows',
  standalone: true,
  imports: [UserBoxComponent],
  templateUrl: './follows.component.html',
  styleUrl: './follows.component.scss'
})
export class FollowsComponent {
  urlSegment : string;
  numbers = Array.from({length: 11}, (_, i) => i);

  constructor(private router: Router){
    this.urlSegment = this.getLastSegmentOfUrl();
    console.log(this.urlSegment);
  }


  private getLastSegmentOfUrl(): string {
    const urlSegments = this.router.url.split('/');
    return urlSegments[urlSegments.length - 1];
  }
  
}
