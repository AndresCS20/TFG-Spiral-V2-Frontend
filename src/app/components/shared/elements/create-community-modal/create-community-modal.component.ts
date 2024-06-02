import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommunitiesService } from '@services/communities.service';

@Component({
  selector: 'app-create-community-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-community-modal.component.html',
  styleUrl: './create-community-modal.component.scss'
})
export class CreateCommunityModalComponent {

  constructor(private communityService: CommunitiesService, private formBuilder: FormBuilder) { }
  onSubmit() :void {

    alert("Pim pam pum bocadillo de tortilla de patata sin cebolla")
    console.log(this.createCommunityForm.value)
  }
  createCommunityForm = this.formBuilder.group({
    shortname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
    description: ['', [Validators.maxLength(200)]],
    profile_picture: ['', [this.minLengthIfNotEmpty(6), Validators.maxLength(40), this.isValidUrl.bind(this), this.isValidImageExtension.bind(this)]],
    banner_picture: ['', [this.minLengthIfNotEmpty(6), Validators.maxLength(40), this.isValidUrl.bind(this), this.isValidImageExtension.bind(this)]],
  });

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
