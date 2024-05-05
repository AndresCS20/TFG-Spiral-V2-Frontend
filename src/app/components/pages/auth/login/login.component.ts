import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { StorageService } from '../../../../core/services/storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  user : any

  logo_url = 'assets/images/spiral.png';
  constructor(private authService: AuthService, private storageService: StorageService) { }

  ngOnInit(): void {

    const theme = document.documentElement.getAttribute('data-theme');
    switch (theme) {
      case 'cupcake':
        this.logo_url='assets/images/spiral-pink.png';
        break;
    
      default:
        break;
    }

    
    console.log(theme);

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.user = this.storageService.getUser();
      console.log(this.user.username)
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
  logout(): void {        
    
    this.storageService.clean();
    window.location.reload();
    // this.authService.logout().subscribe({
    //   next: res => {
    //     console.log(res);

    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });
  }
}

