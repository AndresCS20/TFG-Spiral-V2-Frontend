import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageEntryComponent } from './image-entry/image-entry.component';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CommunitiesService } from '@services/communities.service';
import { AllCommunities } from '@interfaces/communities.interface';
import { OneUser, User } from '@interfaces/users.interface';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-create-publication-modal',
  standalone: true,
  imports: [FormsModule, ImageEntryComponent,ReactiveFormsModule],
  templateUrl: './create-publication-modal.component.html',
  styleUrl: './create-publication-modal.component.scss'
})

export class CreatePublicationModalComponent implements OnInit{
  publicationType = 'text';
  imageUrls: string[] = [];
  inputURL = '';
  youtubeUrl = '';
  isYoutubeUrlValid = false;
  
  @Input() username: string = '';
  user!: User;

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });

  constructor(private sanitizer: DomSanitizer, private userService: UserService) {}

  ngOnInit(): void {

    this.getUser(this.username);

  }

  private getUser(username: string) {
    this.userService.getOneUser(username).subscribe({
      next: (data: OneUser) => {
        this.user = data.body;
        console.log("user",this.user);
      },
      error: (error) => {
        console.log(error);
      }
}
    )};

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

