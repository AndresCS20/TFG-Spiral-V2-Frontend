import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { OneUser, User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.scss'
})
export class PersonalComponent implements OnInit{
  isLoading = true
  complectUser !: User
  currentUser !: User
  currentDate = this.getEighteenYearsAgo();

  constructor (private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService, private userService: UserService) { }

  personalSettingsForm = this.formBuilder.group({
    fullname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    birth_date: ['', [Validators.required, this.minDate('1900-01-01'), this.maxDate(this.currentDate)]],
  });

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    if(this.currentUser){
      this.getUser(this.currentUser.username);
    }
  }

  onSubmit():void{

    if(this.personalSettingsForm.valid){
      const {fullname, email, birth_date} = this.personalSettingsForm.value;
      console.log(fullname, email, birth_date);
      if (fullname && email && birth_date) {
        this.updateUser(fullname, email, new Date(birth_date));
      }
      // this.storageService.updateProfile({fullname, email, birth_date})
    }
  }

  updateUser(fullname:string, email:string, birth_date:Date): void {
    this.userService.updateUser(this.currentUser.username, {fullname: fullname, email: email, birth_date: birth_date}).subscribe({
      next: (data) => {
        Swal.fire({
          icon: 'success',
          title: 'Ajustes personales actualizados',
          text: 'Seras redirigido en 3 segundos al login para que inicies sesion de nuevo',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          customClass: {
            popup: 'bg-base-200',
            title: 'modal-color',
          }
        }).then(() => {
          this.storageService.clean();
          window.location.reload();
        })
      },
    })
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
    this.personalSettingsForm.patchValue({
      fullname: user.fullname,
      email: user.email,
      birth_date: user.birth_date ? user.birth_date.toISOString().split('T')[0] : '' // Convert Date to string
    });

    console.log(this.personalSettingsForm.value);
  }

  getEighteenYearsAgo(): string {
    let currentDate = new Date();
    currentDate.setFullYear(currentDate.getFullYear() - 18);
    let maxDate = currentDate.toISOString().split('T')[0];
    return maxDate;
  }

  minDate(min: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const inputDate = new Date(control.value);
      const minDate = new Date(min);
      return inputDate < minDate ? { 'minDate': {value: control.value}} : null;
    };
  }
  
  maxDate(max: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const inputDate = new Date(control.value);
      const maxDate = new Date(max);
      return inputDate > maxDate ? { 'maxDate': {value: control.value}} : null;
    };
  }
}
