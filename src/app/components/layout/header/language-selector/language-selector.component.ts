import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  languages = [
    { name: 'Español', code: 'es', svg: 'icon-[circle-flags--es]'},
    { name: 'Ingles', code: 'gb' , svg: 'icon-[circle-flags--gb]'},
    { name: 'Italiano', code: 'it', svg: 'icon-[circle-flags--it]'},
    { name: 'Aleman', code: 'de', svg: 'icon-[circle-flags--de]'},
    { name: 'Frances', code: 'fr', svg: 'icon-[circle-flags--fr]' }

    ]
    languageSelected = signal(this.languages[0])

    changeLanguage(language: any){
      this.languageSelected.set(language)
    }
    
    getLanguage(){
      console.log(this.languageSelected())
    }
}
