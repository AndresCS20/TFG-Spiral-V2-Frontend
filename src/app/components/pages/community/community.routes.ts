import { Routes } from '@angular/router';

import { homeGuard } from 'src/app/core/guards/home.guard';
import { ownerCommunity } from 'src/app/core/guards/ownerCommunity.guard';


const routes: Routes = [
  { path: ':shortname/feed', canActivate: [homeGuard], loadComponent: () => import('@components/pages/community/feed/feed.component').then(m => m.FeedComponent)},
  { path: ':shortname/settings', canActivate: [ownerCommunity], loadComponent: () => import('@components/pages/community/settings/settings.component').then(m => m.SettingsComponent)},
  { path: ':shortname/members', canActivate: [homeGuard], loadComponent: () => import('@components/pages/community/members/members.component').then(m => m.MembersComponent) },
  { path: ':shortname/about', canActivate: [homeGuard], loadComponent: () => import('@components/pages/community/about-us/about-us.component').then(m => m.AboutUsComponent) }
  ];


// export const routes: Routes = [
//     {
//       path: '',
//       component: CommunityComponent,
//     },
//     {
//       path: ':shortname',
//       loadComponent: () => import('@components/pages/community/community.component').then((c) => c.CommunityComponent),
//     },
//     {
//       path: ':shortname/members',
//       loadComponent: () => import('@components/pages/community/members/members.component').then((c) => c.MembersComponent),
//     },
//     {
//       path: ':shortname/settings',
//       loadComponent: () => import('@components/pages/community/settings/settings.component').then((c) => c.SettingsComponent),
//     },
//     { path: '**', redirectTo: '' },
//   ];
// export const routes: Routes = [
//   {
//     path: '',
//     loadComponent: () =>
//       import('@components/pages/community/community.component').then((c) => c.CommunityComponent),
//   },
//   {
//     path: ':shortname',
//     loadComponent: () =>
//       import('@components/pages/community/community.component').then((c) => c.CommunityComponent),
//   },
//   {
//     path: ':shortname/members',
//     loadComponent: () =>
//       import('@components/pages/community/members/members.component').then((c) => c.MembersComponent),
//   },
//   {
//     path: ':shortname/settings',
//     loadComponent: () =>
//       import('@components/pages/community/settings/settings.component').then((c) => c.SettingsComponent),
//   },

//   { path: '**', redirectTo: '' },
// ];

export default routes;