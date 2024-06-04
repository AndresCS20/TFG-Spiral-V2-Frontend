import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Community, CommunityCreate } from '@interfaces/communities.interface';
import { User } from '@interfaces/users.interface';
import { CommunitiesService } from '@services/communities.service';
import { StorageService } from '@services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-community-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-community-modal.component.html',
  styleUrl: './create-community-modal.component.scss'
})
export class CreateCommunityModalComponent implements OnInit{

  constructor(private router: Router,private communityService: CommunitiesService, private formBuilder: FormBuilder, private storageService: StorageService) { }
  currentUser !: User
  createCommunityForm = this.formBuilder.group({
    shortname: ['', [Validators.required, this.textNumberUnderscoreDashValidator(),Validators.minLength(3), Validators.maxLength(20)]], //NOTA VALIDA QUE NO META CARACTERES ESPECIALES
    fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    description: ['', [Validators.maxLength(200)]],
    profile_picture: ['', [this.minLengthIfNotEmpty(6), Validators.maxLength(100), this.isValidUrl.bind(this), this.isValidImageExtension.bind(this)]],
    banner_picture: ['', [this.minLengthIfNotEmpty(6), Validators.maxLength(100), this.isValidUrl.bind(this), this.isValidImageExtension.bind(this)]],
  });


  ngOnInit(): void {
    this.currentUser = this.storageService.getUser()
  }

  onSubmit() :void {

    if(this.createCommunityForm.valid){
      this.createCommunity()
    }
  }
  private createCommunity(){


    let community : any = this.createCommunityForm.value;
    community.shortname = community.shortname.toLowerCase()
    let communityCreate : CommunityCreate = {...community, owner: this.currentUser._id}
    console.log(communityCreate)
    this.communityService.createCommunity(communityCreate).subscribe(
      (data) => {
        document.getElementById('close-create-community-modal')?.click();

        Swal.fire({
          icon: 'success',
          title: 'Comunidad creada',
          text: 'Se ha creado la comunidad correctamente, en 3 segundos seras redirigido a la comunidad',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: 'bg-base-200',
            title: 'modal-color',
          }
        })
        .then(() => {
          this.router.navigate([`/community/${community.shortname}/feed`]);
        })

      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
  textNumberUnderscoreDashValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^[a-zA-Z0-9_-]*$/.test(control.value);
      return valid ? null : { invalidCharacters: true };
    };
  }

  isValidImageExtension(control: AbstractControl): ValidationErrors | null {
    const url = control.value;
    if(!url){
      return null
    }
    const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'png'];
    const urlExtension = url.split('.').pop()?.toLowerCase();
    return urlExtension !== undefined && validImageExtensions.includes(urlExtension) ? null : { invalidImageExtension: true };
  }
  
  isValidUrl(control: AbstractControl): ValidationErrors | null {
    const url = control.value;
    if(!url){
      return null
    }
    if (!url || typeof url !== 'string') {
      return { invalidUrl: true };
    }
    try {
      new URL(url);
      return null;
    } catch (error) {
      console.log('Error al validar la URL:', error);
      return { invalidUrl: true };
    }
  }

  minLengthIfNotEmpty(minLen: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length < minLen) {
        return { minlength: { requiredLength: minLen, actualLength: control.value.length } };
      }
      return null;
    };
  }
}
