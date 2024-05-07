import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { StorageService } from './core/services/storage.service';
import { EventBusService } from './core/shared/event-bus.service';
import { HeaderComponent } from '@components/layout/header/header.component';
import { SidebarComponent } from '@components/layout/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '@components/pages/auth/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spiral-v2-frontend';

  isLoggedIn = false;

  username?: string;

  eventBusSub?: Subscription;
  storedTheme!: string | null;

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.storedTheme = localStorage.getItem('theme');
    this.changeTheme(this.storedTheme? this.storedTheme : 'dark');
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      console.log(user)

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  changeTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

