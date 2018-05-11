import { TestBed, inject } from '@angular/core/testing';

import { Environment, EnvironmentDefault } from '../model/environment';
import { Authorization, AuthorizationDefault } from '../model/authorization';

import { AppService } from './app.service';

describe('AppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService
      ]
    });
  });

  it('should instantiate', inject([AppService], (appService: AppService) => {
    expect(appService).toBeTruthy();
  }));

  it('should have default Environment', inject([AppService], (appService: AppService) => {
    expect(appService.environment.debug).toBeTruthy();
    expect(appService.environment.apiBaseUrl).toBe('http://cleandminds/');
  }));

  it('should have default Authorization', inject([AppService], (appService: AppService) => {
    expect(appService.authorization.isAuthenticated).toBeTruthy();
    expect(appService.authorization.isAuthenticated()).toBeTruthy();
  }));

});
