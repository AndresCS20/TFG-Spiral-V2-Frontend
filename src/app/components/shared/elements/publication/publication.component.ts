import { Component, Input, OnInit, signal } from '@angular/core';
import { AvatarFrameComponent } from '../avatar-frame/avatar-frame.component';
import { BodyReaction, OnePublication, Publication, ReactionReaction } from '@interfaces/publications.interface';
import { StorageService } from '@services/storage.service';
import { RouterLink } from '@angular/router';
import moment from 'moment';
import 'moment/locale/es'
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PublicationsService } from '@services/publications.service';
 @Component({
  selector: 'app-publication',
  standalone: true,
  imports: [AvatarFrameComponent, RouterLink, CarouselModule],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss'
})
export class PublicationComponent implements OnInit{

  constructor(private storageServie: StorageService, private publicationService: PublicationsService) {}
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
      this.reactions.set(this.publication.reactions)
 
      this.updateReactionsSats()

      // this.publication.reactions.sort((a, b) => b.reactions.length - a.reactions.length);
      // this.mostReacted.set(this.publication.reactions.slice(0, 3))
      
      // for(let i = 0; i < this.reactions().length; i++){
      //   reactCount+=this.reactions()[i].reactions.length
      // }
      // this.reactionCount.set(reactCount)
      this.activeReaction.set(this.hasUserReacted())
     if(this.activeReaction()){
      console.log("this.activeReaction()", this.activeReaction())
     }
    }
  }

  getEmbedLink(videoUrl: string): string | null {
    const longUrlPattern = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const shortUrlPattern = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/;
    
    let match = videoUrl.match(longUrlPattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    match = videoUrl.match(shortUrlPattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    return null; // Return null if the URL doesn't match any known pattern
  }    

  hasUserReacted(): BodyReaction | null {
    // console.log("ID USU:", this.user._id)
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

  addReactionBackend(reaction: BodyReaction): void {
    const body = {
      userId: this.user._id,
      reactionType: reaction.type
    }
    this.publicationService.addReaction(this.publication._id, body).subscribe({
      next: (data: OnePublication) => {
        this.publication = data.body
        this.reactions.set(this.publication.reactions)
        this.activeReaction.set(reaction)
        this.updateReactionsSats()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  deleteReactionBackend(reaction: BodyReaction): void {
  
    this.publicationService.deleteReaction(this.publication._id, this.user._id,reaction._id).subscribe({
      next: (data: OnePublication) => {
        this.publication = data.body
        this.reactions.set(this.publication.reactions)
        this.activeReaction.set(null)
        this.updateReactionsSats()
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  updateReaction(reaction : any){
    console.log("activeReaction", this.activeReaction())
    if(this.activeReaction() == null){
      // if (this.activeReaction()?.name != reaction.name) {
      // Add your code here    
      // reaction.count.update((value: number) => value + 1)
      // this.activeReaction.set(reaction)
      
      this.addReactionBackend(reaction)
      

      console.log("Yo me ejecuto para agregar una reaccion al post")
    // }
  //   else{
  //     // Add your code here
  //     reaction.count.update((value: number) => value - 1)
  //     this.activeReaction.set(reaction)
  //     console.log("¿Me ejecuto alguna vez?")
  //  }
  }
    else if(this.activeReaction()?.name == reaction.name){
      // reaction.count.update((value: number) => value - 1)
      // this.activeReaction.set(null)
      this.deleteReactionBackend(reaction)
      
      //TODO: Revisar el update del stats de reactions
      console.log("Yo me ejecuto para quitar la reaccion seleccionada")
    }
    
  };
  
  // hasUserReacted(type: string): boolean {
  //   return this.publication.reactions.some(reaction => 
  //     reaction.reactions.some(userReaction => userReaction.user === this.user._id)
  //   );
  // }

  dateFormatted(): string {
    return moment(this.publication.createdAt).locale('es').fromNow();
  }

  updateReactionsSats(){
    let reactCount=0
    console.log("me he actualizado")
    this.publication.reactions.sort((a, b) => b.reactions.length - a.reactions.length);
      this.mostReacted.set(this.publication.reactions.slice(0, 3))
      
      for(let i = 0; i < this.reactions().length; i++){
        reactCount+=this.reactions()[i].reactions.length
      }
      this.reactionCount.set(reactCount)
  }
  

}
