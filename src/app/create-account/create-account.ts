import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-create-account',
  imports: [MatButtonModule],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss'
})
export class CreateAccount {
  userService = inject(UserService);
  router = inject(Router);
  changeRef = inject(ChangeDetectorRef);
  error = '';
  strengthLevel = 0;
  strengthPercent = 0;
  strengthLabel = '';
  emailValue = '';
  usernameValue = '';
  passwordValue = '';
  confirmValue = '';
  emailInvalid = false;

  async onCreate(username: string, email: string, password: string, confirm: string): Promise<void> {
    if (password !== confirm) {
      this.error = 'Passwords do not match';
      return;
    }
    this.error = '';
    try {
      await this.userService.createAccount(email, password, username);
      // Navigate to login page on success
      this.router.navigate(['/login']);
    } catch (err: any) {
      this.error = err?.message || String(err);
    }
  }

  updateStrength(password: string): void {
    const score = this.calculateScore(password);
    // Map score (0-4) to percent and level
    this.strengthPercent = Math.min(100, Math.round((score / 4) * 100));
    if (score <= 1) {
      this.strengthLevel = 0;
      this.strengthLabel = 'Weak';
    } else if (score === 2) {
      this.strengthLevel = 1;
      this.strengthLabel = 'Fair';
    } else if (score === 3) {
      this.strengthLevel = 2;
      this.strengthLabel = 'Good';
    } else {
      this.strengthLevel = 3;
      this.strengthLabel = 'Strong';
    }
    this.changeRef.detectChanges();
  }

  updateDisabled(): void {
    this.changeRef.detectChanges();
  }

  onFieldChange(email: string, username: string, password: string, confirm: string): void {
    this.emailValue = (email || '').trim();
    this.usernameValue = (username || '').trim();
    this.passwordValue = password || '';
    this.confirmValue = confirm || '';
    // ensure strength is recalculated when password changes
    this.updateStrength(this.passwordValue);
    this.changeRef.detectChanges();
  }

  isCreateEnabled(): boolean {
    return !!this.emailValue && !this.emailInvalid && !!this.usernameValue && !!this.passwordValue && !!this.confirmValue && this.passwordValue === this.confirmValue && this.strengthLevel >= 1;
  }

  onEmailChange(email: string): void {
    this.emailValue = (email || '').trim();
    this.emailInvalid = !this.validateEmail(this.emailValue);
    this.changeRef.detectChanges();
  }

  private validateEmail(email: string): boolean {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private calculateScore(pw: string): number {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }
}
