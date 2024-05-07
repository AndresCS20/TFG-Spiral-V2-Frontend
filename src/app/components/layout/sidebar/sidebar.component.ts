import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserzoneComponent } from '../../shared/layout/userzone/userzone.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StorageService } from '@services/storage.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [UserzoneComponent,RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{

  isLoggedIn = false
  
  storedTheme!: string | null;
  themeForm!: FormGroup;
  
  constructor (private storageService: StorageService, private fb: FormBuilder){}
  @ViewChild('iconSelectedTheme', { static: true }) iconSelectedTheme!: ElementRef;

  ngOnInit(): void {

    this.initForm();

    this.isLoggedIn = this.storageService.isLoggedIn();
    this.storedTheme = localStorage.getItem('theme');
    this.changeTheme(this.storedTheme? this.storedTheme : 'dark');
    this.themeForm.patchValue({ theme: this.storedTheme });

  }

  collapseSidebar() {
    document.body.classList.toggle('collapsed');
  }

  initForm() {
    this.themeForm = this.fb.group({
      theme: ['dark']
    });

    this.themeForm.valueChanges.subscribe((value) => {
      this.changeTheme(value.theme);
    });
  }

  changeTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];

}
