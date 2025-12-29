import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-thermometre',
  imports: [CommonModule],
  templateUrl: './thermometre.html',
  styleUrl: './thermometre.scss'
})
export class Thermometre {
  descriptions = [
    $localize`:@@thermometre.soulmates:Soulmates`,
    $localize`:@@thermometre.lovers:Lovers`,
    $localize`:@@thermometre.friends_plus:Friends+`,
    $localize`:@@thermometre.friends:Friends`,
    $localize`:@@thermometre.knowledge:Knowledge`,
    $localize`:@@thermometre.unknown:Unknown`,
    $localize`:@@thermometre.undesired:Undesired`,
    $localize`:@@thermometre.enemies:Enemies`
  ];

  // selected index (0 = hottest)
  selected = signal<number | null>(null);

  questionnaire = inject(QuestionnaireService);

  constructor() {
    // initialize selected from shared state if present
    const idx = this.questionnaire.value.thermometreIndex;
    if (typeof idx === 'number') {
      this.selected.set(idx);
    }
  }

  select(i: number) {
    // Always select exactly one item (no multi-select, no toggle off)
    this.selected.set(i);
    // persist to shared questionnaire state
    this.questionnaire.setThermometre(i);
  }

  isFilled(i: number): boolean {
    // Fill all dots that are at or below the selected row (visual bottom-up fill)
    const s = this.selected();
    if (s === null) return false;
    // rows are indexed top(0) -> bottom(n-1); "under the selected" means larger indices
    return i >= s;
  }

  get selectedIndex() {
    return this.selected();
  }

  get fillPercent(): number {
    const s = this.selected();
    const n = this.descriptions.length;
    if (s === null) return 0;
    // If the first option (index 0) is selected, fill to the top.
    if (s === 0) return 100;
    // Otherwise, fill to the middle of the selected row.
    // Rows are indexed 0 (top) .. n-1 (bottom). Number of rows below selected = (n-1 - s).
    // Distance from bottom to middle of selected row = (rowsBelow + 0.5) rows.
    const rowsBelow = n - 1 - s;
    const fraction = (rowsBelow + 0.5) / n;
    const percent = fraction * 100;
    // clamp between 0 and 100
    return Math.max(0, Math.min(100, percent));
  }
}
