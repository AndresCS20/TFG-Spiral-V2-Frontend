import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { PageTitleComponent } from '../../shared/elements/page-title/page-title.component';
import { PublicationComponent } from '../../shared/elements/publication/publication.component';
import { RouterModule } from '@angular/router';
import { PublicationsService } from '@services/publications.service';
import { HomeDataService } from '@services/data/home-data.service';
import { User } from '@interfaces/users.interface';
import { StorageService } from '@services/storage.service';
import { AllPublications } from '@interfaces/publications.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageTitleComponent, PublicationComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  content?: string;
  user!: User;
  constructor(
    private storage : StorageService,
    private _publicationService: PublicationsService,
    private _homeDataService: HomeDataService 
  ) { }

  ngOnInit(): void {
    this.user = this.storage.getUser();
    this.getFollowingPublications();
  }

  private getFollowingPublications(): void {
    this._publicationService.getFollowingPublications(this.user.username).subscribe({

      next: (data: AllPublications) => {
        this._homeDataService.changeFollowingPublications(data.body);
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}

