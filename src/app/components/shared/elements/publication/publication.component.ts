import { Component, Input, OnInit, signal } from '@angular/core';
import { AvatarFrameComponent } from '../avatar-frame/avatar-frame.component';
import { BodyReaction, Publication } from '@interfaces/publications.interface';
import { StorageService } from '@services/storage.service';
import { RouterLink } from '@angular/router';
import moment from 'moment';
import 'moment/locale/es'
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
 @Component({
  selector: 'app-publication',
  standalone: true,
  imports: [AvatarFrameComponent, RouterLink, CarouselModule],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss'
})
export class PublicationComponent implements OnInit{

  constructor(private storageServie: StorageService) {}
  @Input() publication!: Publication
  user : any
  // reactions = signal<BodyReaction>([])

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoHeight: false,
    autoplay: true,
    center: true,
    items: 1,
    dots: true,
    nav: false
  }


  ngOnInit(): void {
    this.user = this.storageServie.getUser()
  }

  dateFormatted(): string {
    return moment(this.publication.createdAt).locale('es').fromNow();
  }
  

}
