import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./accueil/accueil').then(m => m.Accueil),
    pathMatch: 'full'
  },
  {
    path: 'questionnaire',
    loadComponent: () => import('./questionnaire/questionnaire').then(m => m.Questionnaire)
  }
];
