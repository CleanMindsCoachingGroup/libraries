import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CleanMindsPrimengLibraryConfig } from './model/clean-minds-primeng-library-config';
import { AuthorizationDefault } from './model/authorization';
import { EnvironmentDefault } from './model/environment';

import { AppServiceConfig } from '../x-shared/src/model/app-service-config';
import { AppService } from '../x-shared/src/services/app.service';
import { LogService } from '../x-shared/src/services/log.service';
import { WebApiService } from '../x-shared/src/services/web-api.service';
import { HttpInterceptorService } from '../x-shared/src/services/http-interceptor.service';
import { NavigationGuardService } from './services/navigation-guard.service';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { UxService } from './services/ux.service';

import { ExceptionHandler } from './services/exception-handler';

// Ux component imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UxComponent } from './components/ux/ux.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { GrowlModule } from 'primeng/growl';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BlockUIModule } from 'primeng/blockui';


/**
 * Clean Minds PrimeNg Application Module exports all components of the library for web development
 * exports also all core components from Clean Minds Core Application Module
 */
@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    GrowlModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    BlockUIModule,
    ConfirmDialogModule,
  ],
  declarations: [
    UxComponent
  ],
  exports: [
    UxComponent
  ],
  providers: [
  ]
})
export class CleanMindsPrimeNgModule {

  constructor() {
    console.log(new Date().toISOString() + '\t' + 'CleanMindsPrimeNgModule initialized.'); // tslint:disable-line:no-console
  }


  static forRoot(
    cleanMindsPrimengLibraryConfig: CleanMindsPrimengLibraryConfig
  ): ModuleWithProviders {

    // returns the module
    return {
      ngModule: CleanMindsPrimeNgModule,
      providers: [
        {
          provide: AppServiceConfig,
          useValue: {
            environment: cleanMindsPrimengLibraryConfig.environment == undefined ?
              EnvironmentDefault :
              cleanMindsPrimengLibraryConfig.environment,
              authorization: cleanMindsPrimengLibraryConfig.authorization == undefined ?
              AuthorizationDefault :
              cleanMindsPrimengLibraryConfig.authorization,
          }
        },
        AppService,
        LogService,
        WebApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true,
        },
        UxService,
        NavigationGuardService,
        CanDeactivateGuardService,
        {
          provide: ErrorHandler,
          useClass: ExceptionHandler
        },
        ConfirmationService
      ],
    };

  }

}
