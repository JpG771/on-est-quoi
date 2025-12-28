import { Injectable } from '@angular/core';
import { ToDoItem } from '../models/to-do-item';

export type Language = 'fr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  constructor() {

  }

  getToDoItems(): ToDoItem[] {
    return [
      { id: 1, category: 1 },
      { id: 2, category: 2 },
      { id: 3, category: 3 }
    ];
  }
}
