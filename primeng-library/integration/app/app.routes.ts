import { Routes } from '@angular/router';
import { NavigationGuardService } from 'clean-minds-primeng-library';
import { CanDeactivateGuardService } from 'clean-minds-primeng-library';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CanDeactivateComponent } from './components/can-deactivate/can-deactivate.component';


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
    path: 'can-deactivate', pathMatch: 'full',
    component: CanDeactivateComponent,
    canActivate: [NavigationGuardService],
    canDeactivate: [CanDeactivateGuardService]
  },
  { path: '**', redirectTo: '/home' }
];
