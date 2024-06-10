import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Button, Community, CommunityUpdate, OneCommunity, Rule } from '@interfaces/communities.interface';
import { CommunitiesService } from '@services/communities.service';
import { CommuniyDataService } from '@services/data/communiy-data.service';
import { AvatarFrameComponent } from 'src/app/components/shared/elements/avatar-frame/avatar-frame.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AvatarFrameComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, 
    private router: Router,
    private communityService: CommunitiesService, 
    private communityDataService: CommuniyDataService
  ) {}

  ruleError = false
  buttonUrlError = false
  buttonTitleError = false

  rules = signal<Rule[]>([]);
  ruleTitleInput : string = ''
  ruleContentInput : string = ''

  buttons = signal<Button[]>([]);
  buttonTitleInput : string = ''
  buttonUrlInput : string = ''
  buttonColorSelect : string = ''
  buttonIconInput : string = ''

  complectCommunity !: Community
  isLoading = true

  buttonColorList = ['primary', 'secondary', 'ghost', 'neutral', 'acent','success', 'error', 'warning', 'info', 'link' ]

  formCommunity = this.formBuilder.group({
    fullname : ['',[Validators.required, Validators.minLength(3),Validators.maxLength(60)]],
    description : ['',[Validators.maxLength(400)]],
    profile_picture : ['',[this.minLengthIfNotEmpty(6), Validators.maxLength(100), this.urlValidator(), this.isValidImageExtension.bind(this)]],
    banner_picture : ['',[this.minLengthIfNotEmpty(6), Validators.maxLength(100), this.urlValidator(), this.isValidImageExtension.bind(this)]],
  })

  formButtons = this.formBuilder.group({
    buttonTitle : ['',[Validators.required, Validators.minLength(3),Validators.maxLength(40)]],
    buttonUrl : ['',[Validators.required, Validators.minLength(10),Validators.maxLength(200), this.urlValidator()]],
    buttonColor : ['', [Validators.required]],
    // buttonIcon : [''],
  })

  // formRules = this.formBuilder.group({
  //   ruleTitle : ['',[Validators.required, Validators.minLength(10),Validators.maxLength(40)]],
  //   ruleContent : ['',[Validators.required, Validators.minLength(10),Validators.maxLength(200)]],
  // })

  ngOnInit(): void {
    this.communityDataService.currentCommunity.subscribe(community => {

      if (community) {
        this.complectCommunity = community
        this.isLoading = false
        this.fillFormWithCommunity(this.complectCommunity);
        console.log("Comunidad completa:", this.complectCommunity);
      }
    })
  }

  onSubmit() {

    if(this.formCommunity.valid){
      const {fullname, description, profile_picture, banner_picture} = this.formCommunity.value;
      const community : CommunityUpdate = {
        fullname: fullname || this.complectCommunity.fullname,
        description: description || '',
        profile_picture: profile_picture || 'https://via.placeholder.com/150/0000FF/808080?text='+this.complectCommunity.shortname,
        banner_picture: banner_picture || 'https://via.placeholder.com/150/0000FF/808080?text='+this.complectCommunity.fullname,
        buttons: this.buttons(),
        rules: this.rules()
      }
      this.updateCommunity(this.complectCommunity.shortname, community);
    }

  }

  private fillFormWithCommunity(community: Community) {
    this.formCommunity.patchValue({
      fullname: community.fullname,
      description: community.description,
      profile_picture: community.profile_picture,
      banner_picture: community.banner_picture
    })
    this.rules.set(community.rules)
    this.buttons.set(community.buttons)
  }
  updateCommunity(shortname:string,communityToUpdate: CommunityUpdate): void {
    this.communityService.updateCommunity(shortname, communityToUpdate).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Ajustes de la comunidad actualizados',
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
        }).then(() => {
          window.location.reload();
        })
      },
    })
  }

  // getCommunity(shortname: string) {
  //   this.communityService.getOneCommunity(shortname).subscribe(
  //     (data: OneCommunity) => {
  //       this.complectCommunity = data.body;
  //       if(this.complectCommunity){
  //         // this.fillFormWithUser(this.complectCommunity);
  //       }
  //       this.isLoading = false
  //       console.log("Comunidad completa:", this.complectCommunity);
  //     },
  //     (error) => {
  //       console.error('Error al obtener el usuario:', error);
  //     }
  //   );
  // }

  urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const url = control.value;
  
      // Permitir campos vacíos
      if (!url) {
        return null;
      }
  
      // Patrón para validar la URL
      const urlPattern = /^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i;
      const isValid = urlPattern.test(url);
  
      return isValid ? null : { customInvalidUrl: true };
    };
  }

  addButton(){

    if(this.formButtons.valid){

      const {buttonTitle, buttonUrl, buttonColor} = this.formButtons.value;
      console.log(buttonTitle, buttonUrl, buttonColor);
      const button = {title: buttonTitle || 'Default', url: buttonUrl || '#', color: buttonColor || 'primary', icon: 'fa-chevrons-left'}
      this.buttons().push(button);
      this.formButtons.reset();
    }
 
  }

  deleteButton(index: number) {
    this.buttons().splice(index, 1);
  }

  addRule() {
  
    if(this.ruleTitleInput.length == 0 ){
      this.ruleError = true;
      
    } else{
      let rule = {title: this.ruleTitleInput, content: this.ruleContentInput}
      this.rules().push(rule);
      this.ruleTitleInput = '';
      this.ruleContentInput = '';
    }
  }

  deleteRule(index: number) {
    this.rules().splice(index, 1);
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
