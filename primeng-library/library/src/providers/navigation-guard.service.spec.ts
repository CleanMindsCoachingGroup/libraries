import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, Route } from '@angular/router';

import { AppServiceConfig } from '../../x-shared/src/model/app-service-config';
import { AppService } from '../../x-shared/src/providers/app.service';
import { LogService } from '../../x-shared/src/providers/log.service';
import { Environment, EnvironmentDefault } from '../model/environment';
import { Authorization, AuthorizationDefault } from '../model/authorization';

import { UxService } from './ux.service';
import { WebApiService } from '../../x-shared/src/providers/web-api.service';
import { ConfirmationService } from 'primeng/api';

import { NavigationGuardService } from './navigation-guard.service';

describe('NavigationGuardService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
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
        NavigationGuardService
      ]
    });
  });

  it('checks if a user is valid if route activation',
    async(
      inject(
        [
          AppService,
          NavigationGuardService,
          Router
        ],
        (appService: AppService,
          authorizationGuardService: NavigationGuardService,
          router: Router
        ) => {

          appService.authorization.isAuthenticated = () => false;
          const spyNavigation = spyOn(router, 'navigate');

          expect(authorizationGuardService.canActivate(
            <ActivatedRouteSnapshot>{ routeConfig: { path: 'test' } }, undefined
          )).toBeFalsy();
          expect(spyNavigation).toHaveBeenCalled();
          expect(spyNavigation).toHaveBeenCalledWith(undefined);

          // restores the provider value
          appService.authorization.isAuthenticated = () => true;
        })
    )
  );


  it('checks if a user is valid if route child activation',
    async(
      inject(
        [
          AppService,
          NavigationGuardService,
          Router
        ],
        (appService: AppService,
          authorizationGuardService: NavigationGuardService,
          router: Router
        ) => {

          appService.authorization.isAuthenticated = () => false;
          const spyNavigation = spyOn(router, 'navigate');

          expect(authorizationGuardService.canActivateChild(
            <ActivatedRouteSnapshot>{ routeConfig: { path: 'test' } }, undefined
          )).toBeFalsy();
          expect(spyNavigation).toHaveBeenCalled();
          expect(spyNavigation).toHaveBeenCalledWith(undefined);

          // restores the provider value
          appService.authorization.isAuthenticated = () => true;
        })
    )
  );


  it('checks if a user is valid if load',
    async(
      inject(
        [
          AppService,
          NavigationGuardService,
          Router
        ],
        (appService: AppService,
          authorizationGuardService: NavigationGuardService,
          router: Router
        ) => {

          appService.authorization.isAuthenticated = () => false;
          const spyNavigation = spyOn(router, 'navigate');

          expect(authorizationGuardService.canLoad(
            <Route>{ path: 'test' }
          )).toBeFalsy();
          expect(spyNavigation).toHaveBeenCalled();
          expect(spyNavigation).toHaveBeenCalledWith(undefined);

          // restores the provider value
          appService.authorization.isAuthenticated = () => true;
        })
    )
  );

});
