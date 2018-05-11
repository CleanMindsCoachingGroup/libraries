import { Routes } from '@angular/router';
import { NavigationGuardService } from 'clean-minds-primeng-library';
import { CancellationGuardService } from 'clean-minds-primeng-library';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChangeGuardComponent } from './components/change-guard/change-guard.component';


/**
 * Rutas de la aplicación
 */
export const AppRoutes: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'home', pathMatch: 'full',
    component: HomeComponent,
    canActivate: [NavigationGuardService]
  },
  {
    path: 'login', pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'change-guard', pathMatch: 'full',
    component: ChangeGuardComponent,
    canActivate: [NavigationGuardService],
    canDeactivate: [CancellationGuardService]
  },
  { path: '**', redirectTo: '/home' }
];
