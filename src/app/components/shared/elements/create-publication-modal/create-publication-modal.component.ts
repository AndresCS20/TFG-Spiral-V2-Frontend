import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageEntryComponent } from './image-entry/image-entry.component';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-publication-modal',
  standalone: true,
  imports: [FormsModule, ImageEntryComponent],
  templateUrl: './create-publication-modal.component.html',
  styleUrl: './create-publication-modal.component.scss'
})

export class CreatePublicationModalComponent {
  publicationType = 'text';
  imageUrls: string[] = [];
  inputURL = '';
  youtubeUrl = '';
  isYoutubeUrlValid = false;

  constructor(private sanitizer: DomSanitizer) {}

  // Cuando las imágenes cambien en el componente ImageEntryComponent, actualiza tus imágenes
  onImagesChange(newImages: string[]) {
    this.imageUrls = newImages;
    console.log("image",this.imageUrls);
  }
  setPublicationType(type: string) {
    this.publicationType = type;
  }  
  
  checkYoutubeVideo(){
    this.isYoutubeUrlValid = this.verifyYoutubeUrl();
  }

  verifyYoutubeUrl(): boolean {
    const url = this.inputURL;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === 'www.youtube.com' && urlObj.pathname === '/watch' && urlObj.searchParams.has('v')) {
        const vParam = urlObj.searchParams.get('v');
        if (vParam) { // Comprueba que el valor de 'v' no esté vacío
          console.log("vParam",vParam);
          console.log("urlObj",urlObj);
          this.youtubeUrl = this.inputURL;
          return true;
        }
      }
      if (urlObj.hostname === 'youtu.be' && urlObj.pathname.length > 1) {
        this.youtubeUrl = this.inputURL;
        return true;
      }
    } catch (error) {
      console.log('Error al verificar la URL de YouTube:', error);
    }
    return false;
  }
 
  getEmbedUrl(url: string): SafeResourceUrl | undefined {
    let videoId: string = '';
    const urlObj = new URL(url);

    if (urlObj.hostname === 'www.youtube.com') {
      videoId = urlObj.searchParams.get('v') ?? '';
    } else if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1);
    }

    if (videoId) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}`);
    }
  
    return undefined;
  }

  // verifyYoutubeUrl(url: string): boolean {
  //   try {
  //     const youtubeRegex = new RegExp(
  //       /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  //     );
  //     const match = url.match(youtubeRegex);
  //     if (match) {
  //       return true;
  //     }
  //   } catch (error) {
  //     console.log('Error al verificar la URL de YouTube:', error);
  //   }
  //   return false;
  // }

  verifyUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      console.log('Error al verificar la URL:', error);
      return false;
    }


  }

  }

