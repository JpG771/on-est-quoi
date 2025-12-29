import { Component, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { I18nService } from './services/i18n.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  i18n = inject(I18nService);
  router = inject(Router);
  userService = inject(UserService);

  constructor() {
    // start auth state listener so templates can react to sign-in changes
    try {
      this.userService.initAuthListener();
    } catch (e) {
      // ignore
    }
  }

  toggleLanguage(): void {
    const currentLang = this.i18n.getCurrentLanguage();
    this.i18n.setLanguage(currentLang === 'fr' ? 'en' : 'fr');
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }

  async onSignOut(): Promise<void> {
    try {
      await this.userService.signOut();
      await this.router.navigate(['/']);
    } catch (e) {
      // ignore errors for now
    }
  }
}
