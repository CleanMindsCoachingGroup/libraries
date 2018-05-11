import { Injectable, Optional } from '@angular/core';

import { AppServiceConfig } from '../model/app-service-config';
import { Environment, EnvironmentDefault } from '../model/environment';
import { Authorization, AuthorizationDefault } from '../model/authorization';

/**
 * Injectable container for global app objects, created by internal AppServiceFactory.
 */
@Injectable()
export class AppService {

  private _environment: Environment = EnvironmentDefault;
  private _authorization: Authorization = AuthorizationDefault;

  constructor(
    @Optional() appServiceConfig: AppServiceConfig
  ) {

    if (appServiceConfig != undefined && appServiceConfig.environment != undefined) {
      this._environment = appServiceConfig.environment;
    } else {
      console.log(new Date().toISOString() + '\t' + 'No Environment supply for AppService, using default.'); // tslint:disable-line:no-console max-line-length
    }

    if (appServiceConfig != undefined && appServiceConfig.authorization != undefined) {
      this._authorization = appServiceConfig.authorization;
    } else {
      console.log(new Date().toISOString() + '\t' + 'No Authorization supply for AppService, using default.'); // tslint:disable-line:no-console max-line-length
    }

    console.log(new Date().toISOString() + '\t' + 'AppService created.'); // tslint:disable-line:no-console
  }

  /**
   * environment variables
   */
  public get environment(): Environment { return this._environment; }

  /**
   * authorization processes
   */
  public get authorization(): Authorization { return this._authorization; }

}
