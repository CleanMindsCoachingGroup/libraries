# Frameworks used in this library

This library was generated and have peer dependencies with 

* [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4
* [Angular](https://angular.io/) version 5.2.10.
* [PrimeNg](https://www.primefaces.org/primeng/#/) version 5.2.6

# Use notes

## Using this library
For use this library, import CleanMindsPrimeNgModule in your app module this way:

```javascript
CleanMindsPrimeNgModule.forRoot(
  <CleanMindsPrimengLibraryConfig>{
    environment: environment,
    authorization: undefined
  })
```

where:
* `environment` must match the clean minds library *Environment* interface.
* `authorizacion` must match the clean minds library *Authorization* interface.

If not config is neccesary, the library use default values:

```javascript
/**
 * Default class for Environment
 */
<Environment>{
  debug: true,
  apiBaseUrl: 'http://cleandminds/',
  localization: {
    msgInternalError: 'Internal error!',
    msgForbiddenPath: 'Sorry, you haven\'t authorization for this.',
    msgConfirmDeactivation: 'There is pending changes. Abort?',
    confirmationDefaultHeader: 'Confirm the action',
    confirmationDefaultMessage: 'Please, confirm the action',
    confirmationDefaultAcceptLabel: 'Accept',
    confirmationDefaultRejectLabel: 'CancelDefault'
  }
};

/**
 * Default class for Authorization
 */
<Authorization> {
  isAuthenticated: () => true,
  isAuthorizedRoutePath: (route: string) => true,
  info: undefined,
};
```

## Module imports and providers supplied by the library

The library adds this modules and services from Angular and Primeng to the application, its import is not necessary:

* Modules and services from Angular
  * ErrorHandler (handled by class ExceptionHandler from library)
  * HTTP_INTERCEPTORS (handled by class HttpInterceptorService from library)
  * BrowserAnimationsModule

* Modules and services from PrimeNg
  * GrowlModule
  * ConfirmDialogModule
  * ConfirmationService
  * DialogModule
  * MessagesModule
  * MessageModule
  * BlockUIModule

The library adds this providers from itself, not necessary to provide in your application:

* AppService
* LogService
* WebApiService
* NavigationGuardService
* CancellationGuardService
* UxService

## CSS

The library do not include any css. Your application must include the PrimeNg and other css needed.

# Feature notes

## UX features

The library includes some ux features through UxService:

```javascript
  constructor (
    uxService: UxService
  ) {}

  uxServiceExamples() {

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
    this.uxService.lockUx('locking Ux...');

    // unlock Ui
    this.uxService.unlockUx();

    // Show confirmation 
    // note the necessary async/await function coding for this.uxService.confirm() method call
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

  }
```
## Forms change control features

in progress...

## Logging features

The library includes a *LogService* logging service that adds timestamp to log entries with debug, info and error methods. If you want to make sure that this logging service it's used in your application you must include in your tsconfig.json the rule:

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

The library includes a *NavigationGuardService* routing service, wich uses the `authorization` object passed in clean minds library module initialization for check the user authentication and routing authorization purposes.

You must include this component in your routes definition:

```javascript
{
  path: 'home', pathMatch: 'full',
  component: HomeComponent,
  canActivate: [NavigationGuardService]
}
```

## HTTP Api calls handling features

The library includes a HTTP client proxy WebApiService with get, post, put, delete and patch methods. This service:

* uses the the `authorization` object passed to clean minds library module initialization for check the user authentication, through HttpInterceptorService.
* returns the result JSON of the request.
* returns `ErrorObservable<ApiException>` if any error occurs during http service call.
* has a `runningApiCalls()` method that return true if any Api call is opened. This method can be used for user information, and is internally used for gui lock purposes during http request.
