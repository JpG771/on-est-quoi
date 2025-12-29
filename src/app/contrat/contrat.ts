import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { RankingLabelComponent } from '../labels/ranking-label';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-contrat',
  imports: [
    CommonModule,
    MatExpansionModule,
    RankingLabelComponent
  ],
  templateUrl: './contrat.html',
  styleUrl: './contrat.scss',
})
export class Contrat {
  questionnaire = inject(QuestionnaireService);
  choices: string[] = ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4', 'Choice 5'];
  favorite: string[] = [];
  love: string[] = [];
  like: string[] = [];
  rarely: string[] = [];
  never: string[] = [];

  constructor() {
    const saved = this.questionnaire.value.contrat;
    if (saved) {
      this.choices = saved.choices ?? this.choices;
      this.favorite = saved.favorite ?? this.favorite;
      this.love = saved.love ?? this.love;
      this.like = saved.like ?? this.like;
      this.rarely = saved.rarely ?? this.rarely;
      this.never = saved.never ?? this.never;
    }
  }

  categories = [
    { id: 0, name: 'choices', point: 0, icon: '🔥', placeholder: $localize`:@@contrat.choices.placeholder:Return unwanted choices here` },
    { id: 1, name: 'favorite', point: 10, icon: '⭐', placeholder: $localize`:@@contrat.favorite.placeholder:Drop a limited number of favorite items here` },
    { id: 2, name: 'love', point: 5, icon: '❤️', placeholder: $localize`:@@contrat.love.placeholder:Drop what you love here` },
    { id: 3, name: 'like', point: 3, icon: '👍', placeholder: $localize`:@@contrat.like.placeholder:Drop like items here` },
    { id: 4, name: 'rarely', point: 1, icon: '🤔', placeholder: $localize`:@@contrat.rarely.placeholder:Drop what can be done but rarely here` },
    { id: 5, name: 'never', point: -5, icon: '🚫', placeholder: $localize`:@@contrat.never.placeholder:Drop thing you never want here` },
  ];

  dragOverCategory: string | null = null;

  onDragStart(event: DragEvent, item: string, from: string) {
    event.dataTransfer!.setData('text/plain', JSON.stringify({ item, from }));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragEnter(category: string) {
    this.dragOverCategory = category;
  }

  onDragLeave() {
    this.dragOverCategory = null;
  }

  onDrop(event: DragEvent, to: string) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer!.getData('text/plain'));
    const { item, from } = data;

    // Remove from source
    (this as any)[from] = (this as any)[from].filter((i: string) => i !== item);

    // Add to target
    (this as any)[to].push(item);

    this.dragOverCategory = null;
    // persist contrat state to shared service
    this.questionnaire.setContrat({
      choices: this.choices,
      favorite: this.favorite,
      love: this.love,
      like: this.like,
      rarely: this.rarely,
      never: this.never
    });
  }

  getItems(name: string): string[] {
    return (this as any)[name];
  }
}
