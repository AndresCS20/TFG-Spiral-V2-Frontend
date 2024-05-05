import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { max } from 'rxjs';
import Swal from 'sweetalert2'
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit{
  
  // form: any = {
  //   username: null,
  //   fullname: null,
  //   email: null,
  //   password: null,
  //   location: null,
  //   birth_date: null,
  // };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  formRegister!: FormGroup;
  

  currentDate = this.getEighteenYearsAgo();
  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }
  router = inject(Router)

  ngOnInit(): void {
    this.initRegisterForm();
  }  
  
  initRegisterForm(): void {

    this.formRegister = new FormGroup({
      username: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)], updateOn: 'blur' }),
      email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur' }),
      confirmPassword: new FormControl('', { validators: [Validators.required, Validators.minLength(6)], updateOn: 'blur' }),
      fullname: new FormControl('', { validators: Validators.maxLength(50), updateOn: 'blur' }),
      birth_date: new FormControl('', { validators: [Validators.required, this.minDate('1900-01-01'), this.maxDate(this.currentDate)], updateOn: 'blur' })
  }, { validators: this.checkPasswords, updateOn: 'blur' });
  

  // this.formRegister = this.formBuilder.group({
  //   username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
  //   email: ['', [Validators.required, Validators.email]],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   confirmPassword: ['',  [Validators.required, Validators.minLength(6)]],
  //   fullname: ['', Validators.maxLength(50)],
  //   birth_date: ['', [Validators.required, this.minDate('1900-01-01'), this.maxDate(this.currentDate)]]
  // }, { validator: this.checkPasswords , updateOn: 'blur' });
}
  register(): void {
    const { username, email, password, fullname, birth_date} = this.formRegister.value;

    this.authService.register(username, email, password,fullname,birth_date).subscribe({
      next: data => {
        console.log(data);
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Ahora puedes iniciar sesión',
          icon: 'success',
          confirmButtonText: 'Iniciar sesión'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
        }})
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.log(this.errorMessage)
      }
    });
  }

  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    return password && confirmPassword && password.value === confirmPassword.value ? null : { notSame: true };
  };
  

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
