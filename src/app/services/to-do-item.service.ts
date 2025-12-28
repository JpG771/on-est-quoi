import { Injectable } from '@angular/core';
import { ToDoItem } from '../models/to-do-item';

@Injectable({
  providedIn: 'root'
})
export class ToDoItemService {
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
