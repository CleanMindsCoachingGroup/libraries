import { Injectable } from '@angular/core';
import { Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanLoad, CanActivateChild } from '@angular/router';

import { Environment } from '../model/environment';
import { AppService } from '../../x-shared/src/services/app.service';
import { LogService } from '../../x-shared/src/services/log.service';
import { UxService } from './ux.service';
import { UxMessage } from '../model/ux-message';



/**
 * Authorizations control service.
 *
 * Implements the interfaces CanActivate, CanLoad and CanActivateChild from @angular/router
 * Can be used by application routing module for authorizations control
 */
@Injectable()
export class NavigationGuardService implements CanActivate, CanLoad, CanActivateChild {

  constructor(
    private router: Router,
    private appService: AppService,
    private logService: LogService,
    private uxService: UxService,
  ) {

    this.logService.info('NavigationGuardService created.');

  }


  public canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): boolean {

    this.logService.debug('Checking permissions for activation of route \'' + activatedRouteSnapshot.routeConfig.path + '\'');

    if (this.checkRouteAuthorization(activatedRouteSnapshot.routeConfig.path)) {
      return true;
    }

    this.logService.error('Forbidden route activation \'' + activatedRouteSnapshot.routeConfig.path + '\'');
    return false;

  }


  public canActivateChild(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): boolean {

    this.logService.debug('Checking permissions for child activation of route \'' + activatedRouteSnapshot.routeConfig.path + '\'');

    if (this.checkRouteAuthorization(activatedRouteSnapshot.routeConfig.path)) {
      return true;
    }

    this.logService.error('Forbidden route child activation \'' + activatedRouteSnapshot.routeConfig.path + '\'');
    return false;

  }

  public canLoad(route: Route): boolean {

    this.logService.debug('Checking permissions for route load \'' + route.path + '\'');

    if (this.checkRouteAuthorization(route.path)) {
      return true;
    }

    this.logService.error('Forbidden route load \'' + route.path + '\'');
    return false;

  }

  /**
   * Checks the route authorization:
   * * the user is logged
   * * the user has permission for the route
   */
  private checkRouteAuthorization(
    path: string
  ) {

    if (this.appService.authorization.isAuthenticated() && this.appService.authorization.isAuthorizedRoutePath(path)) {
      return true;
    } else {
      this.uxService.pushMessages(
        new UxMessage(UxMessage.Severity.Error, 99999, (<Environment>this.appService.environment).localization.msgForbiddenPath)
      );
      this.logService.error('Forbidden access' + path ? `to path ${path}.` : '.');
      this.router.navigate(undefined);
      return false;
    }

  }
}
