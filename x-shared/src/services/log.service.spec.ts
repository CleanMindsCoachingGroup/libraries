import { TestBed, inject } from '@angular/core/testing';

import { Environment, EnvironmentDefault } from '../model/environment';
import { Authorization, AuthorizationDefault } from '../model/authorization';

import { AppService } from './app.service';

import { LogService } from './log.service';

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppService,
        LogService
      ]
    });
  });


  it('should instantiate', inject([LogService], (logService: LogService) => {
    expect(logService).toBeTruthy();
  }));


  it('debug not logs if not debug in environment',
    inject([AppService, LogService], (appService: AppService, logService: LogService) => {
      spyOn(window.console, 'log');
      appService.environment.debug = false;
      logService.debug('debug');
      expect(window.console.log).not.toHaveBeenCalled();
    }));


  it('debug logs if debug in environment',
    inject([AppService, LogService], (appService: AppService, logService: LogService) => {
      spyOn(window.console, 'log');
      appService.environment.debug = true;
      logService.debug('debug');
      expect(window.console.log).toHaveBeenCalled();
    }));


  it('logs info', inject([LogService], (logService: LogService) => {
    spyOn(window.console, 'info');
    logService.info('info', ['object']);
    expect(window.console.info).toHaveBeenCalled();
  }));


  it('logs error', inject([LogService], (logService: LogService) => {
    spyOn(window.console, 'error');
    logService.error('error', ['object']);
    expect(window.console.error).toHaveBeenCalled();
  }));
});
