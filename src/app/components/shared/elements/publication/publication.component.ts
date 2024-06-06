import { Component, Input, OnInit, signal } from '@angular/core';
import { AvatarFrameComponent } from '../avatar-frame/avatar-frame.component';
import { BodyReaction, OnePublication, Publication, ReactionReaction } from '@interfaces/publications.interface';
import { StorageService } from '@services/storage.service';
import { RouterLink } from '@angular/router';
import moment from 'moment';
import 'moment/locale/es'
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { PublicationsService } from '@services/publications.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YouTubePlayerModule } from '@angular/youtube-player';
 @Component({
  selector: 'app-publication',
  standalone: true,
  imports: [AvatarFrameComponent, RouterLink, CarouselModule, YouTubePlayerModule],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.scss'
})
export class PublicationComponent implements OnInit{

  constructor(private storageServie: StorageService, private publicationService: PublicationsService, private sanitizer: DomSanitizer) {}
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
  obtenerIdVideoYoutube(url: string): string | null {
    // Expresión regular para extraer la ID del video de una URL de YouTube en el formato "https://youtu.be/ID" 
    const regExp1 = /^https?:\/\/youtu\.be\/([A-Za-z0-9_-]+)\??.*$/;
    // Expresión regular para extraer la ID del video de una URL de YouTube en el formato "https://www.youtube.com/watch?v=ID"
    const regExp2 = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?.*v=([A-Za-z0-9_-]+).*$/;

    // Intentar hacer coincidir con el primer formato de URL
    let match = url.match(regExp1);
    if (match && match[1]) {
        return match[1]; 
    }

    // Si no coincide con el primer formato, intentar hacer coincidir con el segundo formato de URL
    match = url.match(regExp2);
    if (match && match[1]) {
        return match[1]; 
    }

    // Si no coincide con ninguno de los formatos, retorna null
    return null;
}
  obtenerEnlaceEmbed(url: string): SafeResourceUrl | null {
    const regExp1 = /^https:\/\/youtu\.be\/([A-Za-z0-9_-]+)\??.*$/;
    const regExp2 = /^https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]+).*$/;
    let match;
    let videoId = null;

    match = url.match(regExp1);
    if (match && match[1]) {
      videoId = match[1];
    }

    if (!videoId) {
      match = url.match(regExp2);
      if (match && match[1]) {
        videoId = match[1];
      }
    }

    if (videoId) {
      const embedUrl = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    }

    return "null";
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
    // cons7ole.log("me he actualizado")
    this.publication.reactions.sort((a, b) => b.reactions.length - a.reactions.length);
      this.mostReacted.set(this.publication.reactions.slice(0, 3))
      
      for(let i = 0; i < this.reactions().length; i++){
        reactCount+=this.reactions()[i].reactions.length
      }
      this.reactionCount.set(reactCount)
  }
  


  onReady(event: any) {
    console.log('Reproductor de YouTube listo');
  }

  onChange(event: any) {
    console.log('Estado del reproductor de YouTube cambiado');
  }

  onStart(event: any) {
    console.log('Reproducción iniciada');
  }

  onPause(event: any) {
    console.log('Reproducción pausada');
  }

  onEnd(event: any) {
    console.log('Reproducción finalizada');
  }

}
