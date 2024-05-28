import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import { StorageService } from '@services/storage.service';
import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent implements OnInit{
  user !: User
  constructor (private formBuilder: FormBuilder, private authService: AuthService, private storageService: StorageService, private userService: UserService) { }
  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');
  
    return password && confirmPassword && password.value === confirmPassword.value ? null : { notSame: true };
  };

  securityForm = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  },{ validators: this.checkPasswords, updateOn: 'blur' });

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

  onSubmit(): void {
    const oldPassword = this.securityForm.get('oldPassword')?.value ?? '';
    const newPassword = this.securityForm.get('newPassword')?.value ?? '';
    const username = this.user.username;
    if (oldPassword && newPassword) {
      this.checkPasswordBack(username, oldPassword).then(isValid => {
        if (isValid) {
          // Lógica para cuando la contraseña es válida
          this.updatePassword(username, newPassword);
        } else {
          // Lógica para cuando la contraseña es inválida
          Swal.fire({
            icon: 'error',
            title: 'Contrasena incorrecta',
            text: 'La contrasena actual es incorrecta',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            customClass: {
              popup: 'bg-base-200',
              title: 'modal-color',
            }
          })
        }
      });
    }
  }

  updatePassword(username: string, newPassword: string): void {
  
    this.userService.updateUser(username, { password: newPassword }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Contrasena actualizada',
          text: 'Seras redirigido en 3 segundos al login para que inicies sesion con tu nueva contraseña',
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
      error: (err) => {
        console.log(err);
      }
    });
  
  }

  
  checkPasswordBack(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.authService.checkPassword(username, password).subscribe({
        next: () => {
          resolve(true);
        },
        error: (err) => {
          console.log(err);
          resolve(false);
        }
      });
    });
  }
  

}
