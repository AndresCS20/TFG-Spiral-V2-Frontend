import { Component, Input, OnInit } from '@angular/core';
import { AvatarFrameComponent } from '../avatar-frame/avatar-frame.component';
import { Publication } from '@interfaces/publications.interface';
import { StorageService } from '@services/storage.service';
import { RouterLink } from '@angular/router';
import moment from 'moment';
import 'moment/locale/es'
 @Component({
  selector: 'app-publication',
  standalone: true,
  imports: [AvatarFrameComponent, RouterLink],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss'
})
export class PublicationComponent implements OnInit{

  constructor(private storageServie: StorageService) {}
  @Input() publication!: Publication
  user : any
  ngOnInit(): void {
    this.user = this.storageServie.getUser()
  }

  dateFormatted(): string {
    return moment(this.publication.createdAt).locale('es').fromNow();
  }

}
