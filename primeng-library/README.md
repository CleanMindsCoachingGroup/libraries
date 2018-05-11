# Frameworks used in this library

This library was generated and have peer dependencies with 

* [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4
* [Angular](https://angular.io/) version 5.2.10.
* [PrimeNg]https://www.primefaces.org/primeng/#/ version 5.2.6

# Use notes

## Using this library
For use this library, import CleanMindsPrimeNgModule in your app module this way:

```javascript
CleanMindsPrimeNgModule.forRoot(environment, authorization)
```

where:
* `environment` must match the clean minds library Environment interface.
* `authorizacion` must match the clean minds library Authorization interface.

## imports and providers from library
The library imports this modules, not necessary import in your application:

```javascript
import { ModuleWithProviders, ErrorHandler, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { BlockUIModule } from 'primeng/blockui';
```

The library provides this providers, not necessary to provide in your application:

* AppService (from library)
* LogService (from library)
* RestApiService (from library)
* HTTP_INTERCEPTORS (from Angular, with library class HttpInterceptorService)
* NavigationGuardService (from library)
* CancellationGuardService (from library)
* UxService (from library)
* ErrorHandler (from Angular, with library class ExceptionHandler)
* ConfirmationService (from primeNg)

## CSS

The library do not include any css. The application must include the PrimeNg and other css needed.

# Features notes

## UX features

The library includes some ux features through UxService:

```javascript
  // show Success Message
  this.uxService.pushMessages(new UxMessage(UxMessage.Severity.Success, 99999, 'Message'));

  // show Error Message
  this.uxService.pushMessages(new UxMessage(UxMessage.Severity.Error, 99999, 'Message'));

  // show Info Message
  this.uxService.pushMessages(new UxMessage(UxMessage.Severity.Info, 99999, 'Message'));

  // show Warning Message
  this.uxService.pushMessages(new UxMessage(UxMessage.Severity.Warning, 99999, 'Message'));

  // show Last Messages popup
  this.uxService.showMessagesHistory = true;

  // lock Ui
  this.uxService.lockUx('locking Ux for two seconds...');

  // unlock Ui
  this.uxService.unlockUx();

  // Show confirmation (note the necessary async/await function coding for this.uxService.confirm() method call)
  async showConfirmation() {
    if ((await this.uxService.confirm())) {
      this.uxService.pushMessages(
        new UxMessage(UxMessage.Severity.Success, 0, 'Accepted')
      );
    } else {
      this.uxService.pushMessages(
        new UxMessage(UxMessage.Severity.Success, 0, 'Cancelled')
      );
    }
  }
```
## Forms change control features

## Logging features

The library includes a LogService. If you want use this amazing logging service for your application you  must include in your tsconfig.json the rule:

```javascript
"no-console": [
  // logging by clean minds library LogService
  true,
  "log", 
  "error",
  "debug",
  "info",
  "trace"
  ]
```

## Routing handling features

The library includes a routing NavigationGuardService. This service:
* uses the `authorization` object passed to clean minds library module for check the user authentication and routing authorization purposes.

## HTTP Api calls handling features

The library includes a HTTP proxy ApiService. This service:
* uses the the `authorization` object passed to clean minds library module for check the user authentication.
* returns `ErrorObservable<ApiException>` if any error occurs during http service call.
* has a `runningApiCalls()` method that return true if any Api call is opened. This method can be used for user information, and is internally used for gui lock purposes during request.
