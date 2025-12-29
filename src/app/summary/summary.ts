import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.scss'
})
export class Summary {
  questionnaire = inject(QuestionnaireService);

  // mirror points used in Contrat component
  private categoryPoints: Record<string, number> = {
    choices: 0,
    favorite: 10,
    love: 5,
    like: 3,
    rarely: 1,
    never: -5
  };

  get destinataire(): string | null {
    return this.questionnaire.value.destinataireEmail ?? null;
  }

  get thermometreIndex(): number | null {
    return this.questionnaire.value.thermometreIndex ?? null;
  }

  get contrat() {
    return this.questionnaire.value.contrat ?? { choices: [], favorite: [], love: [], like: [], rarely: [], never: [] };
  }

  get thermoScore(): number {
    const idx = this.thermometreIndex;
    if (idx === null || typeof idx !== 'number') return 0;
    // higher on list (lower index) yields bigger score; use inverse scale
    const descriptions = 8; // same scale as Thermometre options
    const factor = Math.max(0, descriptions - idx);
    return factor * 10; // simple mapping
  }

  get contratScore(): number {
    let s = 0;
    for (const key of Object.keys(this.contrat)) {
      const arr = (this.contrat as any)[key] as any[];
      const pts = this.categoryPoints[key] ?? 0;
      s += (arr?.length ?? 0) * pts;
    }
    return s;
  }

  get totalScore(): number {
    return this.thermoScore + this.contratScore;
  }

  get scoreClass(): string {
    const s = this.totalScore;
    if (s < 0) return 'score-negative';
    if (s < 40) return 'score-low';
    if (s < 80) return 'score-medium';
    return 'score-high';
  }
}
