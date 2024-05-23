import { Routes } from '@angular/router';

import { homeGuard } from 'src/app/core/guards/home.guard';


const routes: Routes = [
  { path: '', redirectTo: 'following-feed', pathMatch: 'full' },
  { path: 'following-feed', canActivate: [homeGuard], loadComponent: () => import('@components/pages/home/following-feed/following-feed.component').then(m => m.FollowingFeedComponent)},
  { path: 'communities-feed', canActivate: [homeGuard], loadComponent: () => import('@components/pages/home/communities-feed/communities-feed.component').then(m => m.CommunitiesFeedComponent)},
  ];

export default routes;