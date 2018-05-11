import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import 'rxjs/add/operator/toPromise';

import { Environment } from '../model/environment';
import { AppService } from '../../x-shared/src/providers/app.service';
import { LogService } from '../../x-shared/src/providers/log.service';
import { UxService } from './ux.service';

/**
 * Interface for component deactivation control
 */
export interface ComponentCanDeactivate {
  canDeactivate: () => boolean;
}


/**
 * Component deactivation control service.
 *
 * Implements the interfaces CanDeActivate, CanLoad and CanActivateChild from @angular/router
 * - The route must define this guard:
 *     { path: 'route-path', component: PageComponent, canDeactivate: [CancellationGuardService], ...
 */
@Injectable()
export class CancellationGuardService implements CanDeactivate<ComponentCanDeactivate> {

  constructor(
    private appService: AppService,
    private logService: LogService,
    private uxService: UxService
  ) {
    this.logService.info('CancellationGuardService created.');
  }

  /**
   * Checks if the page has changes and shows a confirmation message
   */
  async canDeactivate(component: ComponentCanDeactivate) {

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
