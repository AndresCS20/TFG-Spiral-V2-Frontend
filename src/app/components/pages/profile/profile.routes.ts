import { Routes } from '@angular/router';

import { homeGuard } from 'src/app/core/guards/home.guard';


const routes: Routes = [
  
  { path: ':username/feed', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/feed/feed.component').then(m => m.FeedComponent)},
  { path: ':username/followers', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/follows/follows.component').then(m => m.FollowsComponent)},
  { path: ':username/following', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/follows/follows.component').then(m => m.FollowsComponent) },
  { path: ':username/communities', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/communities/communities.component').then(m => m.CommunitiesComponent) },
  { path: ':username/media', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/media/media.component').then(m => m.MediaComponent) },
  ];

export default routes;