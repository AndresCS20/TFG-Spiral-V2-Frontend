import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
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
