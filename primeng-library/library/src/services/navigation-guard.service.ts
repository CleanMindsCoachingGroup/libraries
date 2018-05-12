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
    const authorization = this.checkAuthorization(activatedRouteSnapshot.routeConfig.path);
    this.logService.debug('Checking authorization for activation of route \'' +
      activatedRouteSnapshot.routeConfig.path + '\': ' + authorization);
    return authorization;
  }

  public canActivateChild(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ): boolean {
    const authorization = this.checkAuthorization(activatedRouteSnapshot.routeConfig.path);
    this.logService.debug('Checking authorization for child activation of route \'' + activatedRouteSnapshot.routeConfig.path +
      '\': ' + authorization);
    return authorization;
  }

  public canLoad(route: Route): boolean {
    const authorization = this.checkAuthorization(route.path);
    this.logService.debug('Checking authorization for route load \'' + route.path + '\': ' + authorization);
    return authorization;
  }

  /**
   * Checks if the user is logged
   */
  private checkAuthorization(
    path: string
  ) {
    if (this.appService.authorization.isAuthenticated() && this.appService.authorization.isAuthorizedRoutePath(path)) {
      return true;
    } else {
      this.uxService.pushMessages(
        new UxMessage(UxMessage.Severity.Success, 99999, (<Environment>this.appService.environment).localization.msgForbiddenPath)
      );
      this.logService.error('Forbidden access' + path ? `to path ${path}.` : '.');
      this.router.navigate(undefined);
      return false;
    }
  }
}
