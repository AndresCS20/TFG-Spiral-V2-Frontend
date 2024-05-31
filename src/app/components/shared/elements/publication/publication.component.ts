import { Component, Input, OnInit, signal } from '@angular/core';
import { AvatarFrameComponent } from '../avatar-frame/avatar-frame.component';
import { BodyReaction, Publication, ReactionReaction } from '@interfaces/publications.interface';
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
  reactions = signal<BodyReaction[]>([])
  activeReaction = signal<BodyReaction | null>(null) // Se guarda el type de reacción activa
  reactionCount = signal(0)
  mostReacted = signal<BodyReaction[]>([])

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
    if(this.publication){
      let reactCount=0
      this.reactions.set(this.publication.reactions)
 
      this.publication.reactions.sort((a, b) => b.reactions.length - a.reactions.length);
      this.mostReacted.set(this.publication.reactions.slice(0, 3))
      
      for(let i = 0; i < this.reactions().length; i++){
        reactCount+=this.reactions()[i].reactions.length
      }
      this.reactionCount.set(reactCount)
      this.activeReaction.set(this.hasUserReacted())
     if(this.activeReaction()){
      console.log("this.activeReaction()", this.activeReaction())
     }
    }
  }
  hasUserReacted(): BodyReaction | null {
    console.log("ID USU:", this.user._id)
    for (let reaction of this.publication.reactions) {
      reaction.reactions.some(userReaction => {
        console.log(userReaction.user._id, this.user._id)
      })
      if (reaction.reactions.some(userReaction => userReaction.user._id === this.user._id)) {
        console.log("REAZION", reaction)
        return reaction;
      }
    }
    return null;
  }
  
  // hasUserReacted(type: string): boolean {
  //   return this.publication.reactions.some(reaction => 
  //     reaction.reactions.some(userReaction => userReaction.user === this.user._id)
  //   );
  // }

  dateFormatted(): string {
    return moment(this.publication.createdAt).locale('es').fromNow();
  }
  

}
