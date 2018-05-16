import { TestBed, fakeAsync, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AppServiceConfig } from '../../x-shared/src/model/app-service-config';
import { AppService } from '../../x-shared/src/services/app.service';
import { LogService } from '../../x-shared/src/services/log.service';
import { Environment, EnvironmentDefault } from '../model/environment';
import { Authorization, AuthorizationDefault } from '../model/authorization';

import { UxService } from './ux.service';
import { WebApiService } from '../../x-shared/src/services/web-api.service';
import { ConfirmationService } from 'primeng/api';

import { CanDeactivateGuardService } from './can-deactivate-guard.service';

import { UxComponent } from '../components/ux/ux.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { GrowlModule } from 'primeng/growl';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BlockUIModule } from 'primeng/blockui';



describe('CanDeactivateGuardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        UxComponent
      ],
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ConfirmDialogModule,
        GrowlModule,
        DialogModule,
        MessagesModule,
        MessageModule,
        BlockUIModule,
        RouterTestingModule.withRoutes([
          {
            path: '', pathMatch: 'full',
            component: UxComponent, // dummy, used only for test
            canDeactivate: [CanDeactivateGuardService]
          },
          {
            path: 'test', pathMatch: 'full',
            component: UxComponent, // dummy, used only for test
          }
        ]),
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
        UxService,
        WebApiService,
        ConfirmationService,
        CanDeactivateGuardService
      ]
    });
  });


  it('checks the can deactivate if route configure the service',
    async(
      inject(
        [
          AppService,
          Router,
          CanDeactivateGuardService
        ],
        (
          appService: AppService,
          router: Router,
          canDeactivateGuardService: CanDeactivateGuardService
        ) => {
          const spyNavigation = spyOn(canDeactivateGuardService, 'canDeactivate');

          router.navigate(['/'])
            .then(() => {
              router.navigate(['/test'])
                .then(() => {
                  expect(spyNavigation).toHaveBeenCalled();
                });
            });
        })
    )
  );

});
