import { ErrorHandler, Inject } from '@angular/core';

import { AppService } from '../../x-shared/src/services/app.service';
import { LogService } from '../../x-shared/src/services/log.service';
import { Environment } from '../model/environment';



/**
 * Generic Error Handler
 *
 * Logs the error, shows browser alert and delegates the treatment to Angular ErrorHandler
 */
export class ExceptionHandler extends ErrorHandler {

  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject(LogService) private logService: LogService
  ) {
    super();
    this.logService.info('ExceptionHandler created.');
  }



  handleError(
    error: any
  ) {
    // logs error
    this.logService.error(error);
    // send message to terminal
    alert((<Environment>this.appService.environment).localization.msgInternalError || 'Internal error!' + `\n\n${error}`);
    // Angular errorhandler delegation
    super.handleError(error);
  }
}
