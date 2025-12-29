import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatDividerModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  userService = inject(UserService);
  router = inject(Router);
  error = '';

  onSubmit(username: string, _password: string): void {
    console.log('Login submitted for', username);
  }

  async onGoogleSignIn(): Promise<void> {
    this.error = '';
    try {
      await this.userService.signInWithGoogle();
      // redirect after successful login
      this.router.navigate(['/']);
    } catch (err: any) {
      this.error = err?.message || String(err);
    }
  }
}
