import { Component, ElementRef, Renderer2 } from '@angular/core';
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

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  setPublicationType(type: string) {
    this.publicationType = type;
  }

  onInput(index: number) {
    if (index === this.imageUrls.length - 1 && this.imageUrls.length < 10) {
      this.imageUrls.push('');
    }
  }


  addImage(index: number) {
    const imageUrl = this.imageUrls[index];
    console.log("imageUrl", index, this.imageUrls)
    if (!this.isValidUrl(imageUrl)) {
      alert('La URL de la imagen no es válida.');
      return;
    }
  
    try {
      const imageContainer = this.el.nativeElement.querySelector('#imageContainer');
      const image = this.renderer.createElement('img');
      this.renderer.setProperty(image, 'src', imageUrl);
      this.renderer.appendChild(imageContainer, image);
  
      // Añade un nuevo campo de entrada si hay menos de 10
      if (this.imageUrls.length < 10) {
        this.imageUrls.push('');
      }
    } catch (error) {
      console.error('Error al añadir la imagen:', error);
    }
  }

  // addImage(index: number) {
  //   const imageUrl = this.imageUrls[index];
  //   console.log("imageUrl", index, this.imageUrls)
  //   if (!this.isValidUrl(imageUrl)) {
  //     alert('La URL de la imagen no es válida.');
  //     return;
  //   }

  //   try {
  //     const imageContainer = this.el.nativeElement.querySelector('#imageContainer');
  //     const image = this.renderer.createElement('img');
  //     this.renderer.setProperty(image, 'src', imageUrl);
  //     this.renderer.appendChild(imageContainer, image);
  //     this.imageUrls.splice(index, 1);
  //   } catch (error) {
  //     console.error('Error al añadir la imagen:', error);
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
