import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule,FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ImageEntryComponent } from './image-entry/image-entry.component';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AllCommunities } from '@interfaces/communities.interface';
import { OneUser, OneUserCommunity, User } from '@interfaces/users.interface';
import { UserService } from '@services/user.service';
import { Publication, PublicationCreator } from '@interfaces/publications.interface';
import { PublicationsService } from '@services/publications.service';
import Swal from 'sweetalert2';

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
  constructor(private sanitizer: DomSanitizer, private userService: UserService,private formBuilder: FormBuilder, private publicationService: PublicationsService) {}

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
      next: (data: any) => {
        document.getElementById('close-createpost-modal')?.click();
        Swal.fire({
          icon: 'success',
          title: 'Publicación creada con éxito',
          text: 'Seras redirigido en 3 segundos',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: 'bg-base-200',
            title: 'modal-color',
          }
        })
        console.log(data);
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

