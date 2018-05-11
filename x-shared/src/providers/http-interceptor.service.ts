import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http'; // tslint:disable-line:max-line-length
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { ApiException } from '../exceptions/api-exception';
import { AppService } from './app.service';
import { LogService } from './log.service';
import { RestApiService } from './rest-api.service';



/**
 * Injectable http requests interceptor.
 *
 * . Checks the user authentication from {@link AppService}.{@link Authorization}.
 *
 * . Adjust the request to app requirements: headers and base url from {@link AppService}.{@link Environment}.
 *
 * . Handles the HTTP responses, its JSON format and errors triggered in execution.
 */
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  /** headers for all requests */
  private headers: HttpHeaders;


  constructor(
    private appService: AppService,
    private logService: LogService,
    private apiService: RestApiService
  ) {
    if (this.headers == undefined) {
      logService.debug('Initializing API http headers.');
      this.headers = new HttpHeaders();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Cache-control', 'no-cache');
      this.headers.append('Cache-control', 'no-store');
      this.headers.append('Pragma', 'no-cache');
      this.headers.append('Expires', '0');
    }
    this.logService.info('HttpInterceptorService created.');
  }



  /**
   * Intercepts an outgoing HTTP request, adjust it to app requirements,
   * executes it and handles any error that could be triggered in execution.
   * @see HttpInterceptor
   * @param httpRequest the outgoing HTTP request
   * @param httpHandler a HTTP request handler
   * @returns Observable<HttpEvent<any>> with the response body
   * @throws ErrorObservable<{@link ApiException}>
   */
  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {

    this.logService.debug(`Intercepting HTTP ${httpRequest.method} request: ${JSON.stringify(httpRequest)}`);

    // checks the authorization
    if (!this.appService.authorization.isAuthenticated()) {
      // if the response body isn't a Object throws error
      this.logService.info(
        `Invalid HTTP ${httpRequest.method} request: ${JSON.stringify(httpRequest)}. Forbidden path for not authenticated users.`
      );
      return new ErrorObservable(new ApiException(httpRequest.url, 'Forbidden request path for not authenticated users.'));
    }

    // adds the API call
    this.apiService.addApiCall();

    // clone the request to adjust properties
    httpRequest = httpRequest.clone({
      // set the request headers
      headers: this.headers,
      // maintain the server session
      withCredentials: true,
      // format the URL
      url: `${this.appService.environment.apiBaseUrl}${httpRequest.url}`
    });

    // execute the http request
    return httpHandler
      .handle(httpRequest)

      .do((httpEvent: HttpEvent<any>) => {

        if (httpEvent instanceof HttpResponse) {
          // only JSON responses are valid, then the response must be a Object
          if (httpEvent.body instanceof Object) {
            this.logService.debug(`HTTP response from ${httpRequest.method} request: ${JSON.stringify(httpRequest)}`);
            this.logService.debug(JSON.stringify(httpEvent));
          } else {
            // if the response body isn't a Object throws error
            this.logService.info(`Invalid object in HTTP response from ${httpRequest.method} request: ${JSON.stringify(httpRequest)}`);
            this.logService.debug(JSON.stringify(httpEvent));
            // removes the API call
            this.apiService.removeApiCall();
            throw new ApiException(httpRequest.url,
              'Unknown response in service call.');
          }
        }
        // removes the API call
        this.apiService.removeApiCall();

      })

      .catch(httpEvent => {

        this.logService.info(`HTTP error from ${httpRequest.method} request: ${JSON.stringify(httpRequest)}`);

        // process the error response
        if (httpEvent instanceof HttpErrorResponse) {
          // http error response, inspect for ApiException returns
          this.logService.debug(`HTTP error response from ${httpRequest.method} request: ${JSON.stringify(httpRequest)}`);
          this.logService.debug(httpEvent);
          // removes the API call
          this.apiService.removeApiCall();
          return this.handleHttpResponseError(httpRequest.url, httpEvent);

        } else if (httpEvent instanceof Error && httpEvent.name === ApiException.name) {
          // ApiException exception in response treatment, returns
          // removes the API call
          this.apiService.removeApiCall();
          return new ErrorObservable(httpEvent);

        } else {
          // unknown error, returns new ApiException
          this.logService.debug(`Unknown error response from ${httpRequest.method} request: ${JSON.stringify(httpRequest)}`);
          this.logService.debug(httpEvent);
          // removes the API call
          this.apiService.removeApiCall();
          return new ErrorObservable(new ApiException(httpRequest.url,
            'Unknown error in service call: ' + JSON.stringify(httpEvent)));
        }

      });

  }



  /**
   * Standard treatment of http error response.
   * @param requestPath  path of the http response
   * @param httpResponseError any<@angular/response>
   * @returns ErrorObservable<{@link ApiException}>
   */
  private handleHttpResponseError(
    requestPath: string,
    httpResponseError: any
  ): ErrorObservable {

    let error: Error;

    if (httpResponseError.status === 0) {
      // if status 0 the error is at browser level
      error = new ApiException(requestPath,
        'Browser error in service call: ' + JSON.stringify(httpResponseError));

    } else {
      // server error
      error = new ApiException(requestPath,
        `Error in service call. HTTP Status ${httpResponseError.status}, ${httpResponseError.statusText}.`);

    }
    this.logService.error(httpResponseError);

    return new ErrorObservable(error);
  }
}
