import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProfileDataService } from '@services/data/profile-data.service';
import { User } from '@interfaces/users.interface';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  constructor(private router: Router,private profileDataService: ProfileDataService) {}
  userProfile!: User;
  isLoading = true;
  ngOnInit(): void {
    this.profileDataService.currentUserProfile.subscribe(user => {
      if (user) {
        this.userProfile = user;
        console.log("Usuario",this.userProfile);
        this.isLoading = false;
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
  
    if (window.innerWidth > 992 && isAboutPage) {
      this.router.navigate([`/profile/${communityName}/feed`]);
    }
  }
}
