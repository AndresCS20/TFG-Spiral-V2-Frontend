import { Routes } from '@angular/router';

import { homeGuard } from 'src/app/core/guards/home.guard';


const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', canActivate: [homeGuard], loadComponent: () => import('@components/pages/settings/profile/profile.component').then(m => m.ProfileComponent)},
  { path: 'personal', canActivate: [homeGuard], loadComponent: () => import('@components/pages/settings/personal/personal.component').then(m => m.PersonalComponent)},
  { path: 'security', canActivate: [homeGuard], loadComponent: () => import('@components/pages/settings/security/security.component').then(m => m.SecurityComponent) }
  ];

export default routes;