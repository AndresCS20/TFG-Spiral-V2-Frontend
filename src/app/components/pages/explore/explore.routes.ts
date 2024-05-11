import { Routes } from '@angular/router';

import { homeGuard } from 'src/app/core/guards/home.guard';


const routes: Routes = [
  { path: '', redirectTo: 'global-posts', pathMatch: 'full' },
  { path: 'global-posts', canActivate: [homeGuard], loadComponent: () => import('@components/pages/explore/global-posts/global-posts.component').then(m => m.GlobalPostsComponent)},
  { path: 'meet-people', canActivate: [homeGuard], loadComponent: () => import('@components/pages/explore/meet-people/meet-people.component').then(m => m.MeetPeopleComponent)},
  ];

export default routes;