import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../auth/services/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('../home2/home2.page').then((m) => m.HomePage),
        canActivate: [AuthGuard],
      },
      {
        path: 'gallery',
        loadComponent: () => import('../gallery/gallery.page').then((m) => m.GalleryPage),
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadComponent: () => import('../profile/profile.page').then((m) => m.ProfilePage),
        canActivate: [AuthGuard],
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
];