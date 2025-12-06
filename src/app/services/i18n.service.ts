import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Language = 'fr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private platformId = inject(PLATFORM_ID);
  private currentLanguage = signal<Language>('fr');
  language$ = this.currentLanguage.asReadonly();

  constructor() {
    // Initialize language from localStorage or browser locale (only in browser environment)
    if (isPlatformBrowser(this.platformId)) {
      const savedLanguage = localStorage.getItem('language') as Language | null;
      if (savedLanguage) {
        this.currentLanguage.set(savedLanguage);
      } else {
        const browserLang = navigator.language.split('-')[0];
        this.currentLanguage.set(browserLang === 'fr' ? 'fr' : 'en');
      }
    }
  }

  setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage();
  }
}
