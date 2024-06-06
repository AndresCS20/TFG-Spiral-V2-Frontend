import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { OneUser, User } from '@interfaces/users.interface';
import { StorageService } from '@services/storage.service';
import { UserService } from '@services/user.service';
import { AvatarFrameComponent } from 'src/app/components/shared/elements/avatar-frame/avatar-frame.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AvatarFrameComponent,FormsModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  interests = signal<string[]>([])
  interestInput : string = ''
  userStorage !: User
  complectUser !: User
  isLoading = true
  profilePictureFrames :string[]= []
  constructor (private formBuilder: FormBuilder, private storageService: StorageService, private userService: UserService, private avatarFrame : AvatarFrameComponent) { }

  ngOnInit(): void { 

    this.userStorage = this.storageService.getUser();
    if(this.userStorage){
      this.getUser(this.userStorage.username);
    }
    this.profilePictureFrames = this.avatarFrame.getProfileFrameNames();
    console.log("frames",this.profilePictureFrames)
  }

  profileForm = this.formBuilder.group({
    profile_picture: ['', [this.minLengthIfNotEmpty(6), Validators.maxLength(40), this.isValidUrl.bind(this), this.isValidImageExtension.bind(this)]],
    banner_picture: ['', [this.minLengthIfNotEmpty(6), Validators.maxLength(40), this.isValidUrl.bind(this), this.isValidImageExtension.bind(this)]],
    ubication: ['', [this.minLengthIfNotEmpty(6), Validators.maxLength(60)]],
    description: ['', [this.minLengthIfNotEmpty(6), Validators.maxLength(60)]],
  })

  addInterest(){
    if(this.interestInput){
      this.interests.update(interests => [...interests, this.interestInput]);
      this.interestInput = '';
    }
  }

  removeInterest(interestPosition: number){
    this.interests.update(interests => interests.filter((interest, index) => index !== interestPosition));
  }

  onSubmit():void{
    if(this.profileForm.valid){
      const {profile_picture, banner_picture, ubication, description} = this.profileForm.value
      console.log(profile_picture, banner_picture, ubication, description)
      // this.storageService.updateProfile({profile_picture, banner_picture, ubication, description})
    }
}

private getUser(username: string): void {
  this.userService.getOneUser(username).subscribe(
    (data: OneUser) => {
      this.complectUser = data.body;
      if(this.complectUser){
        this.fillFormWithUser(this.complectUser);
      }
      this.isLoading = false
      console.log("Usuario completo:", this.complectUser);
    },
    (error) => {
      console.error('Error al obtener el usuario:', error);
    }
  );
  
}

private fillFormWithUser(user: User): void {
  this.profileForm.patchValue({
    profile_picture: user.profile_picture,
    banner_picture: user.banner_picture,
    ubication: user.ubication,
    description: user.description
  });
  this.interests.set(user.interests);
}

isValidImageExtension(control: AbstractControl): ValidationErrors | null {
  const url = control.value;
  if(!url){
    console.log("no hay url")
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
    console.log("urn no")
  }
  if (!url || typeof url !== 'string') {
    console.log("no es un string")
    return { invalidUrl: true };
  }
  try {
    new URL(url);
    console.log("url valida")
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
