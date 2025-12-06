import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  i18n = inject(I18nService);

  toggleLanguage(): void {
    const currentLang = this.i18n.getCurrentLanguage();
    this.i18n.setLanguage(currentLang === 'fr' ? 'en' : 'fr');
  }
}
