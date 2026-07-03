import { Component, DestroyRef, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  isCollapsed = signal(false);
  
  storedTheme!: string | null;
  themeForm!: FormGroup;
  
  constructor (private storageService: StorageService, private fb: FormBuilder, private destroyRef: DestroyRef){}
  @ViewChild('iconSelectedTheme', { static: true }) iconSelectedTheme!: ElementRef;

  ngOnInit(): void {

    this.initForm();

    this.isLoggedIn = this.storageService.isLoggedIn();
    this.storedTheme = localStorage.getItem('theme');
    this.changeTheme(this.storedTheme? this.storedTheme : 'dark');
    this.themeForm.patchValue({ theme: this.storedTheme });

    // Restore sidebar state
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') {
      this.isCollapsed.set(true);
    }
  }

  toggleSidebar() {
    this.isCollapsed.update(v => !v);
    localStorage.setItem('sidebar-collapsed', String(this.isCollapsed()));
  }

  initForm() {
    this.themeForm = this.fb.group({
      theme: ['dark']
    });

    this.themeForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
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
