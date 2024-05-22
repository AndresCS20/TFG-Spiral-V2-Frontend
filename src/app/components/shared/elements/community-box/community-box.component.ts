import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Community } from '@interfaces/communities.interface';

@Component({
  selector: 'app-community-box',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './community-box.component.html',
  styleUrl: './community-box.component.scss'
})
export class CommunityBoxComponent {
  @Input() communityMember : boolean= false;
  @Input() community : Community | undefined | undefined = undefined;

  default_profile_image = `https://api.dicebear.com/8.x/initials/svg?seed=${this.community?.profile_picture}?backgroundColor=b6e3f4,c0aede,d1d4f9?fontFamily=Arial,Brush%20Script%20MT,Courier%20New`
  default_banner_image = `https://picsum.photos/seed/${this.community?.banner_picture}/1280/720`
}
