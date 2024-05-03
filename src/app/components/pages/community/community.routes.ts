import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { CommunityComponent } from '@components/pages/community/community.component';


const routes: Routes = [
  { path: ':shortname', loadComponent: () => import('@components/pages/community/feed/feed.component').then(m => m.FeedComponent)},
  { path: ':shortname/settings', loadComponent: () => import('@components/pages/community/settings/settings.component').then(m => m.SettingsComponent)},
  { path: ':shortname/members', loadComponent: () => import('@components/pages/community/members/members.component').then(m => m.MembersComponent) }
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