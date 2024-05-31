import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OnePublication, Publication, Comment } from '@interfaces/publications.interface';
import { PublicationsService } from '@services/publications.service';
import { AvatarFrameComponent } from '../../shared/elements/avatar-frame/avatar-frame.component';
import { User } from '@interfaces/users.interface';
import { CommonModule } from '@angular/common';
import { StorageService } from '@services/storage.service';
import { PageTitleComponent } from '../../shared/elements/page-title/page-title.component';
import { PublicationComponent } from '../../shared/elements/publication/publication.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-publication-view',
  standalone: true,
  imports: [AvatarFrameComponent, RouterModule, CommonModule, PublicationComponent, FormsModule],
  templateUrl: './publication-view.component.html',
  styleUrl: './publication-view.component.scss'
})
export class PublicationViewComponent implements OnInit{

  constructor(
    private storageService : StorageService,
    private publicationService: PublicationsService,     
    private route: ActivatedRoute, 
    private router: Router) { }

    publicationId!: string | null;
    publication !: Publication
    isLoading = true; 

    comments = signal<Comment[]>([]);

    commentBox : string = ""

    user !: User
    ngOnInit(): void {
      let route = this.route;
      while (route.firstChild) route = route.firstChild;
      this.publicationId = route.snapshot.paramMap.get('publicationId');
      this.user = this.storageService.getUser();
      if (this.publicationId) {
        this.getPublicationById(this.publicationId);
      }
    }

    createComment(){
      let commentBody ={
        userId: this.user._id,
        content: this.commentBox
      }
      this.publicationService.createComment(this.publication._id ,{userId: this.user._id, content: this.commentBox}).subscribe({
        next: (data: OnePublication) => {
          this.comments.set(data.body.comments);
          this.commentBox = "";
        },
        error: (error: any) => {
          console.log(error);
        }
      })


    }

    getPublicationById(publicationId: string){

      this.publicationService.getPublicationById(publicationId).subscribe({
        next: (data: OnePublication) => {
          this.publication = data.body;
          console.log("weoeoeoeo",this.publication);
          this.isLoading = false;          
          this.comments.set(this.publication.comments);
        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }

    dateFormatted(date: Date){
      return new Date(date).toDateString();
    }
}
