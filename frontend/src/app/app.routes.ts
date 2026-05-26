import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'silver',
      },
      {
        path: 'silver',
        loadComponent: () =>
          import('./features/silver/pages/silver-dashboard-page/silver-dashboard-page.component').then(
            (m) => m.SilverDashboardPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
