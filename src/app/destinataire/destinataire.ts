import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-destinataire',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './destinataire.html',
  styleUrl: './destinataire.scss'
})
export class Destinataire {
  questionnaire = inject(QuestionnaireService);
  email = this.questionnaire.value.destinataireEmail ?? '';

  isValidEmail(value: string | null | undefined): boolean {
    if (!value) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  onEmailChange(value: string) {
    this.email = value;
    if (this.isValidEmail(value)) {
      this.questionnaire.setDestinataire(value);
    } else {
      this.questionnaire.setDestinataire(null);
    }
  }
}
