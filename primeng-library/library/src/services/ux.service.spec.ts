import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ConfirmationService } from 'primeng/api';

import { AppServiceConfig } from '../../x-shared/src/model/app-service-config';
import { AppService } from '../../x-shared/src/services/app.service';
import { LogService } from '../../x-shared/src/services/log.service';
import { WebApiService } from '../../x-shared/src/services/web-api.service';
import { Environment, EnvironmentDefault } from '../model/environment';
import { Authorization, AuthorizationDefault } from '../model/authorization';
import { UxMessage } from '../model/ux-message';

import { UxService } from './ux.service';

describe('UxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: AppServiceConfig,
          useValue: {
            environment: EnvironmentDefault,
            authorization: AuthorizationDefault,
          }
        },
        AppService,
        LogService,
        WebApiService,
        ConfirmationService,
        UxService
      ]
    });
  });

  it('should instantiate', inject([UxService], (uxService: UxService) => {
    expect(uxService).toBeTruthy();
  }));

  it('stores the delivered messages', inject([UxService], (uxService: UxService) => {
    jasmine.clock().install();
    uxService.pushMessages(new UxMessage(UxMessage.Severity.Success, 0, 'one'));
    expect(uxService.toShowMessagges.length).toBe(1);
  }));

  it('store the last 10 messages history', inject([UxService], (uxService: UxService) => {
    uxService.pushMessages(
      new UxMessage(UxMessage.Severity.Success, 0, 'one'),
      new UxMessage(UxMessage.Severity.Success, 0, 'two'),
      new UxMessage(UxMessage.Severity.Success, 0, 'three'),
      new UxMessage(UxMessage.Severity.Success, 0, 'for'),
      new UxMessage(UxMessage.Severity.Success, 0, 'five'),
      new UxMessage(UxMessage.Severity.Success, 0, 'six'),
      new UxMessage(UxMessage.Severity.Success, 0, 'seven'),
      new UxMessage(UxMessage.Severity.Success, 0, 'eight'),
      new UxMessage(UxMessage.Severity.Success, 0, 'nine'),
      new UxMessage(UxMessage.Severity.Success, 0, 'ten'),
      new UxMessage(UxMessage.Severity.Success, 0, 'eleven'),
    );
    expect(uxService.messagesHistory.length).toBe(10);
    expect(uxService.messagesHistory[0].detail).toBe('two');
  }));

});
