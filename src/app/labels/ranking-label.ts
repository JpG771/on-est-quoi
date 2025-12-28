import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking-label',
  standalone: true,
  imports: [CommonModule],
  template: `@switch (id()) {
    @case (0) {
      <span i18n="@@ranking.0">Choices</span>
    }
    @case (1) {
      <span i18n="@@ranking.1">Favorite</span>
    }
    @case (2) {
      <span i18n="@@ranking.2">Love</span>
    }
    @case (3) {
      <span i18n="@@ranking.3">Accepted</span>
    }
    @case (4) {
      <span i18n="@@ranking.4">Rarely</span>
    }
    @case (5) {
      <span i18n="@@ranking.5">Never</span>
    }
    @default {
      <span i18n="@@ranking.unknown">Unknown Ranking</span>
    }
  }`,
})
export class RankingLabelComponent {
  id = input.required<number>();
}