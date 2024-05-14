import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [RouterModule, AboutUsComponent, RouterLink],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss'
})
export class CommunityComponent implements OnInit{
  communityshortname : any
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    let route = this.route;
    while (route.firstChild) route = route.firstChild;
    this.communityshortname = route.snapshot.paramMap.get('shortname');
    console.log(this.communityshortname); 
  }
  
  navigateToMembers() {
    const shortname = this.route.snapshot.paramMap.get('shortname');
    this.router.navigate(['members'], { relativeTo: this.route });
  }
}
