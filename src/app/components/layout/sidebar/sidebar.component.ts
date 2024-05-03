import { Component, OnInit } from '@angular/core';
import { UserzoneComponent } from '../../shared/layout/userzone/userzone.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [UserzoneComponent,RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  isLoggedIn = false
  
  constructor (private storageService: StorageService){}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  collapseSidebar() {
    document.body.classList.toggle('collapsed');
  }

}
