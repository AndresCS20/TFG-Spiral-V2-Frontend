import { Component, OnInit } from '@angular/core';
import { Community } from '@interfaces/communities.interface';
import { CommunityList } from '@interfaces/users.interface';
import { ProfileDataService } from '@services/data/profile-data.service';
import { CommunityBoxComponent } from 'src/app/components/shared/elements/community-box/community-box.component';

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [CommunityBoxComponent],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.scss'
}) 
export class CommunitiesComponent implements OnInit{
numbers = Array.from({length: 11}, (_, i) => i);
  public communities!: CommunityList[];
  constructor(
    private profileDataService: ProfileDataService,
  ) { }

  ngOnInit(): void {
    this.profileDataService.currentProfileCommunities.subscribe(communities => {
      if (communities) {
        this.communities = communities;
        console.log("COMMUNIDADES USUARIO",this.communities);
      }
    });
  }

}
