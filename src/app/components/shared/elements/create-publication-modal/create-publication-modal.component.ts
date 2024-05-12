import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-publication-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-publication-modal.component.html',
  styleUrl: './create-publication-modal.component.scss'
})

export class CreatePublicationModalComponent {
  publicationType = 'text';
  imageUrls: string[] = [''];
  currentImageUrl = '';
  imageCounter = 0
  @ViewChild('imageInput') imageInput!: ElementRef;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  setPublicationType(type: string) {
    this.publicationType = type;
  }

  onInput(index: number) {
    if (index === this.imageUrls.length - 1 && this.imageUrls.length < 10) {
      this.imageUrls.push('');
    }
  }

 
  addImage() {
    const imageUrl = this.currentImageUrl;
    if (!this.isValidUrl(imageUrl)) {
      alert('La URL de la imagen no es válida.');
      return;
    }

    if (!this.isValidUrl(imageUrl) || !this.isValidImageExtension(imageUrl)) {
      alert('La extensión de la URL no es valida. Por favor ingrese una URL de imagen (jpg, jpeg, png, gif).');
      return;
    }

    const duplicateUrls = this.imageUrls.filter(url => url === imageUrl);
    if (duplicateUrls.length > 0) {
      alert('Esta imagen ya ha sido añadida.');
      return;
    }
    try {
      const imageContainer = this.el.nativeElement.querySelector('#imageContainer');
      
      // Crea un nuevo contenedor para la imagen y el botón de eliminar
      const imageWrapper = this.renderer.createElement('div');
      this.renderer.addClass(imageWrapper, 'image-wrapper');
      this.renderer.addClass(imageWrapper, 'rounded-lg');
      this.renderer.addClass(imageWrapper, 'overflow-hidden');

      // Crea la imagen
      const image = this.renderer.createElement('img');
      this.renderer.setProperty(image, 'src', imageUrl);
      this.renderer.appendChild(imageWrapper, image);
  
      // Crea el botón de eliminar
      const deleteButton = this.renderer.createElement('button');
      this.renderer.addClass(deleteButton, 'btn');
      this.renderer.addClass(deleteButton, 'delete-button');
      this.renderer.listen(deleteButton, 'click', () => this.removeImage(imageUrl));
      const buttonIcon = this.renderer.createElement('i');
      this.renderer.addClass(buttonIcon, 'fa-regular');
      this.renderer.addClass(buttonIcon, 'fa-trash-can');
      this.renderer.appendChild(deleteButton, buttonIcon);
      this.renderer.appendChild(imageWrapper, deleteButton);
  
      // Añade el contenedor de la imagen al imageContainer
      this.renderer.appendChild(imageContainer, imageWrapper);
  
      // Limpia el valor del campo de entrada
      this.currentImageUrl = '';
  
      // Añade la URL de la imagen al array de imageUrls
      this.imageUrls.push(imageUrl);
    } catch (error) {
      console.error('Error al añadir la imagen:', error);
    }
  }
  isValidImageExtension(url: string) {
    const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const urlExtension = url.split('.').pop()?.toLowerCase();
    return urlExtension !== undefined && validImageExtensions.includes(urlExtension);
  }


  removeImage(imageUrl: string) {
    // Comprueba si imageUrls tiene más de un elemento
    if (this.imageUrls.length <= 1) {
      alert('No puedes eliminar la última imagen.');
      return;
    }
  
    try {
      // Encuentra el índice de la URL de la imagen en el array imageUrls
      const index = this.imageUrls.indexOf(imageUrl);
  
      // Elimina la URL de la imagen del array imageUrls
      if (index > -1) {
        this.imageUrls.splice(index, 1);
      }
  
      // Elimina la imagen del contenedor de imágenes
      const imageContainer = this.el.nativeElement.querySelector('#imageContainer');
      if (imageContainer) {
        const image = Array.from(imageContainer.children).find((child: any) => (child as Element).querySelector('img')?.src === imageUrl);
        if (image) {
          this.renderer.removeChild(imageContainer, image);
        }
      } else {
        console.error('No se pudo encontrar el contenedor de imágenes');
      }
    } catch (error) {
      console.error('Error al eliminar la imagen:', error);
    }
  }

  // removeImage(index: number) {
  //   // Comprueba si imageUrls tiene más de un elemento
  //   if (this.imageUrls.length <= 1) {
  //     alert('No puedes eliminar la última imagen.');
  //     return;
  //   }
  
  //   try {
  //     // Elimina la URL de la imagen del array imageUrls
  //     this.imageUrls.splice(index, 1);
  
  //     // Elimina la imagen del contenedor de imágenes
  //     const imageContainer = this.el.nativeElement.querySelector('#imageContainer');
  //     const image = imageContainer.children[index];
  //     this.renderer.removeChild(imageContainer, image);
  //   } catch (error) {
  //     console.error('Error al eliminar la imagen:', error);
  //   }
  // }


  isValidUrl(url: string) {
    try {
      console.log(url)
      new URL(url);
      return true;
    } catch (error) {
      console.log('Error al validar la URL:', error);
      return false;
    }
  }
}

// export class CreatePublicationModalComponent {

//   publicationType = 'text'
//   imageUrls: string[] = [''];
  
//   setPublicationType(type: string) {
//     this.publicationType = type;
//   }

//   onInput(index: number) {
//     if (index === this.imageUrls.length - 1 && this.imageUrls.length < 10) {
//       this.imageUrls.push('');
//     }
//   }

//   addImage(index: number) {
//     const imageContainer = document.getElementById('imageContainer');
//     const image = document.createElement('img');
//     image.src = this.imageUrls[index];
//     imageContainer?.appendChild(image);
//   }
// }
