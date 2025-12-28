import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-to-do-item-label',
  standalone: true,
  imports: [CommonModule],
  template: `@switch (id()) {
    @case (1) {
      <span i18n="@@to-do-item.1">Carpooling</span>
    }
    @case (2) {
      <span i18n="@@to-do-item.2">Go shopping</span>
    }
    @case (3) {
      <span i18n="@@to-do-item.3">Grab a coffee</span>
    }
    @case (4) {
      <span i18n="@@to-do-item.4">Dinner together</span>
    }
    @case (5) {
      <span i18n="@@to-do-item.5">Do sports</span>
    }
    @case (5) {
      <span i18n="@@to-do-item.5">Board games</span>
    }
    @case (6) {
      <span i18n="@@to-do-item.6">Picnic</span>
    }
    @case (7) {
      <span i18n="@@to-do-item.7">Travel together</span>
    }
    @case (8) {
      <span i18n="@@to-do-item.8">Relax together</span>
    }
    @case (9) {
      <span i18n="@@to-do-item.9">Watch a movie</span>
    }
    @case (10) {
      <span i18n="@@to-do-item.10">Watch a show</span>
    }
    @case (11) {
      <span i18n="@@to-do-item.11">Explore the city</span>
    }
    @case (12) {
      <span i18n="@@to-do-item.12">Explore the countryside</span>
    }
    @case (13) {
      <span i18n="@@to-do-item.13">Climb a mountain</span>
    }
    @case (14) {
      <span i18n="@@to-do-item.14">Cook together</span>
    }
    @case (15) {
      <span i18n="@@to-do-item.15">Cook for the other</span>
    }
    @case (16) {
      <span i18n="@@to-do-item.16">Hiking</span>
    }
    @default {
      <span i18n="@@to-do-item.unknown">Unknown To Do Item</span>
    }
  }`,
})
export class ToDoItemLabelComponent {
  id = input.required<number>();
}