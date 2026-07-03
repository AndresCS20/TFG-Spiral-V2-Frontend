import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../../core/services/auth.service';
import { StorageService, UserPublic } from '../../../../core/services/storage.service';
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
  form: { username: string | null; password: string | null } = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  user: UserPublic | null = null

  logo_url = 'assets/images/spiral.png';
  constructor(private authService: AuthService, private storageService: StorageService, private destroyRef: DestroyRef) { }

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
      const loggedUser = this.storageService.getUser();
      this.user = loggedUser;
      console.log(loggedUser?.username)
    }
  }

  onSubmit(): void {
    const username = this.form.username ?? '';
    const password = this.form.password ?? '';

    this.authService.login(username, password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: data => {
        const userPublic: UserPublic = {
          _id: data._id,
          username: data.username,
          fullname: data.fullname,
          email: data.email,
          profile_picture: data.profile_picture,
          banner_picture: data.banner_picture,
        };
        this.storageService.saveUser(userPublic);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
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
