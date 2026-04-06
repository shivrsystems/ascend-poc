import { Routes } from '@angular/router';
import { SignInComponent } from './features/auth/sign-in/sign-in';
import { ShellComponent } from './layout/shell/shell';
import { DashboardComponent } from './features/dashboard/dashboard';
import { ClinicalSitesComponent } from './features/clinical-sites/clinical-sites';
import { CurriculumComponent } from './features/curriculum/curriculum';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'clinical-sites', component: ClinicalSitesComponent },
      { path: 'curriculum', component: CurriculumComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
