import { Routes } from '@angular/router';
import { ProfileComponent } from '@components/pages/profile/profile.component';
import { homeGuard } from './core/guards/home.guard';
import { authGuard } from './core/guards/auth.guard';
import { CommunityComponent } from '@components/pages/community/community.component';
import { MembersComponent } from '@components/pages/community/members/members.component';
import { SettingsComponent } from '@components/pages/community/settings/settings.component';

export const routes: Routes = [


    //------------------------- Home Routes -------------------------//
    { path: 'home',canActivate: [homeGuard],  
      loadComponent: () => import('@components/pages/home/home.component').then(m => m.HomeComponent),
      loadChildren: () => import('@components/pages/home/home.routes')
    },

    //------------------------- Auth Routes -------------------------//
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
   
    //------------------------- Community Routes -------------------------//
    { path: 'communities',canActivate: [homeGuard], loadComponent: () => import('@components/pages/communities/communities.component').then(m => m.CommunitiesComponent)},
    { path: 'community', redirectTo: ''},
    { path: 'community',canActivate: [homeGuard],  
      loadComponent: () => import('@components/pages/community/community.component').then(m => m.CommunityComponent),
      loadChildren: () => import('@components/pages/community/community.routes')
    },
    { path: 'community/:username',canActivate: [authGuard],  component: CommunityComponent },

    //------------------------- Profile Routes -------------------------//
    { path: 'profile', redirectTo: ''}, 
    {
      path: 'profile/:username',
      redirectTo: 'profile/:username/feed',
    },
    { path: 'profile/:username',canActivate: [homeGuard],  
      loadComponent: () => import('@components/pages/profile/profile.component').then(m => m.ProfileComponent),
      loadChildren: () => import('@components/pages/profile/profile.routes')
    },

    //------------------------- Settings Routes -------------------------//
    { path: 'settings',canActivate: [homeGuard],  
      loadComponent: () => import('@components/pages/settings/settings.component').then(m => m.SettingsComponent),
      loadChildren: () => import('@components/pages/settings/settings.routes')
    },

    //------------------------- Explore Routes -------------------------//
    { path: 'explore',canActivate: [homeGuard],  
      loadComponent: () => import('@components/pages/explore/explore.component').then(m => m.ExploreComponent),
      loadChildren: () => import('@components/pages/explore/explore.routes')
    },
    //------------------------- Other Pages Routes -------------------------//
    { path: 'publication/:publicationId',canActivate: [homeGuard], loadComponent: () => import('@components/pages/publication-view/publication-view.component').then(m => m.PublicationViewComponent)},
    { path: 'notifications',canActivate: [homeGuard], loadComponent: () => import('@components/pages/notifications/notifications.component').then(m => m.NotificationsComponent)},
    { path: 'messages',canActivate: [homeGuard], loadComponent: () => import('@components/pages/messages/messages.component').then(m => m.MessagesComponent)},
    { path: 'bookmarks',canActivate: [homeGuard], loadComponent: () => import('@components/pages/bookmarks/bookmarks.component').then(m => m.BookmarksComponent)},
    { path: '**', redirectTo: 'home'}
  ];
