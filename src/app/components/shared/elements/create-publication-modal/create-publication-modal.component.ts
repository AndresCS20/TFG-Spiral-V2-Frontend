import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule,FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageEntryComponent } from './image-entry/image-entry.component';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AllCommunities } from '@interfaces/communities.interface';
import { OneUser, OneUserCommunity, User } from '@interfaces/users.interface';
import { UserService } from '@services/user.service';
import { OnePublication, Publication, PublicationCreator } from '@interfaces/publications.interface';
import { PublicationsService } from '@services/publications.service';
import Swal from 'sweetalert2';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-publication-modal',
  standalone: true,
  imports: [FormsModule, ImageEntryComponent,ReactiveFormsModule, YouTubePlayerModule],
  templateUrl: './create-publication-modal.component.html',
  styleUrl: './create-publication-modal.component.scss'
})

export class CreatePublicationModalComponent implements OnInit{
  publicationType = 'text';
  imageUrls: string[] = [];
  inputURL = '';
  youtubeUrl = '';
  isYoutubeUrlValid = false;
  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private formBuilder: FormBuilder, 
    private publicationService: PublicationsService,
    private router: Router
  ) {}

  @Input() username: string = '';
  user!: User;
  profileForm = this.formBuilder.group({
    postInfo: ['', Validators.required],
    // postCommunity: ['', Validators.required],
  });

  globalPostInfo : OneUserCommunity = {
    _id: '',
    shortname: 'global',
    fullname: 'Publicación Global',
    profile_picture: 'assets/earth.svg'
  }

 postCommunity = signal(this.globalPostInfo)

  updateCommunity(community: OneUserCommunity){
    this.postCommunity.set(community)
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

  //TODO: Implementar metodo para limpiar el formulario al crear la publicacion correctamente

  //TODO: Estudiar la opción de reutilizar el componente de creación de publicaciones para la edición de publicaciones

  onSubmit() {
    console.warn(this.profileForm.value);

    const postInfo = this.profileForm.value.postInfo;


    let publication = {}
    publication  = {
      author: this.user._id,
      content: this.profileForm.value.postInfo,
    }
    if(this.postCommunity().shortname !== 'global'){
      publication = {
      ...publication,
      community: this.postCommunity()._id,
    }
    }
 
    switch (this.publicationType) {
      case 'text':
        console.log('Texto:', this.profileForm.value.postInfo);
        break;
      case 'image':
        publication = {
          ...publication,
          images: this.imageUrls,
        }
        console.log('Imagen:', this.imageUrls);
        break;
      case 'video':
        publication = {
          ...publication,
          video: this.youtubeUrl,
        }
        console.log('Video:', this.youtubeUrl);
        break;
      default:
        console.log('Tipo de publicación no reconocido:', this.publicationType);
    }

    console.log('Publicación:', publication);
    this.createPublication(publication);
  }

  private createPublication(publication: any) {
    //TODO: Revisar al añadir enlace de youtube, que hace que se cree la publicacion
    this.publicationService.createPublication(publication).subscribe({
      next: (data: OnePublication) => {
        const newPost = data.body;
        document.getElementById('close-createpost-modal')?.click();
        Swal.fire({
          icon: 'success',
          title: 'Publicación creada con éxito',
          text: 'Seras redirigido en 3 segundos',
          allowOutsideClick: false, 
          allowEscapeKey: false, 
          allowEnterKey: false, 
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: 'bg-base-200',
            title: 'modal-color',
          }
        })
        .then(() => {
          this.router.navigate(['/publication', newPost._id]); // Reemplaza '/ruta-deseada' con la ruta a la que deseas redirigir
        });
        console.log("postnuevecito",newPost._id);
      },
      error: (error) => {
        console.error(error);
      }
    })

  }

  ngOnInit(): void {

    this.getUser(this.username);

  }

  private getUser(username: string) {
    this.userService.getOneUser(username).subscribe({
      next: (data: OneUser) => {
        this.user = data.body;
        console.log("user",this.user);
        
        // create_post.close()
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

