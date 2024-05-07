import { Routes } from '@angular/router';
import { ProfileComponent } from '@components/pages/profile/profile.component';
import { homeGuard } from './core/guards/home.guard';
import { authGuard } from './core/guards/auth.guard';
import { CommunityComponent } from '@components/pages/community/community.component';
import { MembersComponent } from '@components/pages/community/members/members.component';
import { SettingsComponent } from '@components/pages/community/settings/settings.component';

export const routes: Routes = [


    {
      path: 'home',
      canActivate: [homeGuard],
      loadComponent: () => 
        import('@components/pages/home/home.component').then((c)=> c.HomeComponent)
    },
    {
      path: 'login',
      canActivate: [authGuard],
      loadComponent: () => 
        import('@components/pages/auth/login/login.component').then((c)=> c.LoginComponent)
    },
    {
      path: 'register',
      canActivate: [authGuard],
      loadComponent: () => 
        import('@components/pages/auth/register/register.component').then((c)=> c.RegisterComponent)
    },
    {
      path: 'profile/:username?',
      canActivate: [homeGuard],
      loadComponent: () => 
        import('@components/pages/profile/profile.component').then((c)=> c.ProfileComponent)
    }, 
    { path: 'explore',canActivate: [homeGuard], loadComponent: () => import('@components/pages/explore/explore.component').then(m => m.ExploreComponent)},
    { path: 'notifications',canActivate: [homeGuard], loadComponent: () => import('@components/pages/notifications/notifications.component').then(m => m.NotificationsComponent)},
    { path: 'messages',canActivate: [homeGuard], loadComponent: () => import('@components/pages/messages/messages.component').then(m => m.MessagesComponent)},
    { path: 'bookmarks',canActivate: [homeGuard], loadComponent: () => import('@components/pages/bookmarks/bookmarks.component').then(m => m.BookmarksComponent)},
    { path: 'communities',canActivate: [homeGuard], loadComponent: () => import('@components/pages/communities/communities.component').then(m => m.CommunitiesComponent)},
    { path: 'community', redirectTo: ''},
    { path: 'community',canActivate: [homeGuard],  
      loadComponent: () => import('@components/pages/community/community.component').then(m => m.CommunityComponent),
      loadChildren: () => import('@components/pages/community/community.routes')
      // children: [
      //   { path: ':shortname', loadComponent: () => import('@components/pages/community/feed/feed.component').then(m => m.FeedComponent)},
      //   { path: ':shortname/settings', loadComponent: () => import('@components/pages/community/settings/settings.component').then(m => m.SettingsComponent)},
      //   { path: ':shortname/members', loadComponent: () => import('@components/pages/community/members/members.component').then(m => m.MembersComponent) }
      // ]
    },
    { path: 'community/:shortname',canActivate: [authGuard],  component: CommunityComponent },
    { path: '**', redirectTo: 'home'}
  ];
