import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { I18nService } from './services/i18n.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  i18n = inject(I18nService);
  router = inject(Router);

  toggleLanguage(): void {
    const currentLang = this.i18n.getCurrentLanguage();
    this.i18n.setLanguage(currentLang === 'fr' ? 'en' : 'fr');
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }
}
