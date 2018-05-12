import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Environment } from '../model/environment';
import { AppService } from '../../x-shared/src/services/app.service';
import { LogService } from '../../x-shared/src/services/log.service';
import { UxService } from './ux.service';

/**
 * Interface for component deactivation control
 */
export interface ComponentCanDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


/**
 * Component deactivation control service.
 *
 * Implements the interface CanDeActivate from @angular/router for components.
 * The component:
 * * must define this guard at routing configuration:
 *     { path: 'route-path', component: PageComponent, canDeactivate: [CancellationGuardService], ...
 * * must implement CanDeactivateComponent interface
 */
@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<ComponentCanDeactivate> {

  constructor(
    private appService: AppService,
    private logService: LogService,
    private uxService: UxService
  ) {
    this.logService.info('CancellationGuardService created.');
  }

  /**
   * Checks if the component can deactivate, if not, shows a confirmation message
   */
  async canDeactivate(
    component: ComponentCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {

    if (component.canDeactivate()) {
      return true;
    } else {
      return this.uxService.confirm(
        {
          message: (<Environment>this.appService.environment).localization.msgConfirmDeactivation,
          acceptVisible: true,
          rejectVisible: true,
        }
      );
    }
  }
}
