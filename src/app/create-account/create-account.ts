import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-account',
  imports: [MatButtonModule],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss'
})
export class CreateAccount {
  error = '';
  strengthLevel = 0;
  strengthPercent = 0;
  strengthLabel = '';

  onCreate(username: string, password: string, confirm: string): void {
    if (password !== confirm) {
      this.error = 'Passwords do not match';
      return;
    }
    this.error = '';
    console.log('Create account for', username);
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
