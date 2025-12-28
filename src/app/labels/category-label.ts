import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-label',
  standalone: true,
  imports: [CommonModule],
  template: `@switch (id()) {
    @case (1) {
      <span i18n="@@category.1">Activity</span>
    }
    @case (2) {
      <span i18n="@@category.2">Discussion</span>
    }
    @case (3) {
      <span i18n="@@category.3">Touch</span>
    }
    @case (4) {
      <span i18n="@@category.4">Money</span>
    }
    @case (5) {
      <span i18n="@@category.5">Sports</span>
    }
    @case (6) {
      <span i18n="@@category.6">Build up</span>
    }
    @default {
      <span i18n="@@category.unknown">Other</span>
    }
  }`,
})
export class CategoryLabelComponent {
  id = input.required<number>();
}