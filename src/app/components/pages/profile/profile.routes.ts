import { Routes } from '@angular/router';

import { homeGuard } from 'src/app/core/guards/home.guard';


const routes: Routes = [
  
  { path: 'feed', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/feed/feed.component').then(m => m.FeedComponent)},
  { path: 'followers', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/follows/follows.component').then(m => m.FollowsComponent)},
  { path: 'following', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/follows/follows.component').then(m => m.FollowsComponent) },
  { path: 'communities', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/communities/communities.component').then(m => m.CommunitiesComponent) },
  { path: 'media', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/media/media.component').then(m => m.MediaComponent) },
  { path: 'about', canActivate: [homeGuard], loadComponent: () => import('@components/pages/profile/about/about.component').then(m => m.AboutComponent) },
  ];

export default routes;