import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ContratState {
  choices: string[];
  favorite: string[];
  love: string[];
  like: string[];
  rarely: string[];
  never: string[];
}

export interface QuestionnaireState {
  destinataireEmail?: string | null;
  thermometreIndex?: number | null;
  contrat?: ContratState;
}

@Injectable({ providedIn: 'root' })
export class QuestionnaireService {
  private _state = new BehaviorSubject<QuestionnaireState>({
    destinataireEmail: null,
    thermometreIndex: null,
    contrat: undefined
  });

  state$ = this._state.asObservable();

  get value(): QuestionnaireState {
    return this._state.value;
  }

  setDestinataire(email: string | null): void {
    this._state.next({ ...this._state.value, destinataireEmail: email });
  }

  setThermometre(index: number | null): void {
    this._state.next({ ...this._state.value, thermometreIndex: index });
  }

  setContrat(contrat: ContratState): void {
    this._state.next({ ...this._state.value, contrat });
  }
}
