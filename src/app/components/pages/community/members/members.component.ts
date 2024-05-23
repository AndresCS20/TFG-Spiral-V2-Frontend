import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from '@interfaces/communities.interface';
import { CommuniyDataService } from '@services/data/communiy-data.service';
import { UserBoxComponent } from 'src/app/components/shared/elements/user-box/user-box.component';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [CommonModule,UserBoxComponent],
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent {
  constructor(private router: Router,private communityDataService: CommuniyDataService) {}

  community!: Community

  ngOnInit(): void {
    this.communityDataService.currentCommunity.subscribe(community => {
      if (community) {
        this.community = community;
        console.log("Comunidad",this.community);
      }
    });

  }

}
