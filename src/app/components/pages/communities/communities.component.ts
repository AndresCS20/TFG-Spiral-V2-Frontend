import { Component, OnInit } from '@angular/core';
import { CommunityBoxComponent } from '../../shared/elements/community-box/community-box.component';
import { PageTitleComponent } from '../../shared/elements/page-title/page-title.component';
import { CommunitiesService } from '@services/communities.service';
import { AllCommunities, Community } from '@interfaces/communities.interface';
import { CreateCommunityModalComponent } from '../../shared/elements/create-community-modal/create-community-modal.component';

@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [CommunityBoxComponent, PageTitleComponent, CreateCommunityModalComponent],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.scss'
})
export class CommunitiesComponent implements OnInit{
  numbers = Array.from({length: 11}, (_, i) => i);
  
  communities!: Community[]; 
  communitiesLenght!: number;

  constructor(private _CommunitiesService: CommunitiesService) { }

  ngOnInit(): void {
    this.getCommunities();
  }
private getCommunities() {
 this._CommunitiesService.getCommunities().subscribe({
    next: (data: AllCommunities) => {
      this.communitiesLenght = data.body.length;
      this.communities = data.body;
      console.log(this.communities);
    }, error: (error) => {
      console.log(error);
    }
  });
}

}
