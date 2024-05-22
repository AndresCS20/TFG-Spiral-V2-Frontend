import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Community } from '@interfaces/communities.interface';
import { CommuniyDataService } from '@services/communiy-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  constructor(private router: Router,private communityDataService: CommuniyDataService) {}

  community!: Community
  
  ngOnInit() {
    this.communityDataService.currentCommunity.subscribe(community => {
      if (community) {
        this.community = community;
        console.log("Comunidad",this.community);
      }
    });
    this.checkScreenSizeAndRedirect();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSizeAndRedirect();
  }

  private checkScreenSizeAndRedirect() {
    const urlSegments = this.router.url.split('/');
    const communityName = urlSegments[2];
    const isAboutPage = urlSegments.includes('about');
  
    if (window.innerWidth > 576 && isAboutPage) {
      this.router.navigate([`/community/${communityName}/feed`]);
    }
  }
}
