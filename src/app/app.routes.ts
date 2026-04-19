import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'upload',
  },
  {
    path: 'upload',
    loadComponent: () =>
      import('./components/upload/upload').then((m) => m.Upload),
  },
  {
    path: 'quiz',
    loadComponent: () =>
      import('./components/quiz/quiz').then((m) => m.Quiz),
  },
  {
    path: 'analyzing',
    loadComponent: () =>
      import('./components/analyzing/analyzing').then((m) => m.Analyzing),
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./components/result/result').then((m) => m.Result),
  },
  {
    path: '**',
    redirectTo: 'upload',
  },
];
