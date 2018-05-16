import { Injectable } from '@angular/core';

import { AppService } from './app.service';

/**
 * Injectable Logger service.
 */
@Injectable()
export class LogService {

  constructor(
    private appService: AppService
  ) {

    this.info('LogService created (log debugging: ' + this.appService.environment.debug + ').');

  }


  /**
   * Debug only if not production environment in {@link AppService.environment.production}
   */
  debug(
    object: any, ...objects: any[]
  ) {

    if (this.appService.environment.debug) {
      if (objects && objects.length > 0) {
        console.log(new Date().toISOString() + '\t' + object, objects); // tslint:disable-line:no-console
      } else {
        console.log(new Date().toISOString() + '\t' + object); // tslint:disable-line:no-console
      }
    }

  }


  info(
    object: any, ...objects: any[]
  ) {

    if (objects && objects.length > 0) {
      console.info(new Date().toISOString() + '\t' + object, objects); // tslint:disable-line:no-console
    } else {
      console.info(new Date().toISOString() + '\t' + object); // tslint:disable-line:no-console
    }

  }


  error(
    object: any, ...objects: any[]
  ) {

    if (objects && objects.length > 0) {
      console.error(new Date().toISOString() + '\t' + object, objects); // tslint:disable-line:no-console
    } else {
      console.error(new Date().toISOString() + '\t' + object); // tslint:disable-line:no-console
    }

  }
}
