import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-destinataire',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './destinataire.html',
  styleUrl: './destinataire.scss'
})
export class Destinataire {
  email = '';

  isValidEmail(value: string | null | undefined): boolean {
    if (!value) return false;
    // simple email regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
