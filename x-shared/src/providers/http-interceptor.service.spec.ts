import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Environment } from '../model/environment';
import { Authorization } from '../model/authorization';

import { AppService } from './app.service';
import { LogService } from './log.service';
import { RestApiService } from './rest-api.service';

import { HttpInterceptorService } from './http-interceptor.service';

describe('HttpInterceptorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppService,
        LogService,
        RestApiService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpInterceptorService,
          multi: true
        }
      ]
    });
  });

  afterEach(inject([HttpTestingController], (httpTestingController: HttpTestingController) => {
    // ever, assert that there are no outstanding requests
    httpTestingController.verify();
  }));

  it('should be created',
    inject([HTTP_INTERCEPTORS], (service: HttpInterceptorService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should checks the url authorization',
    inject(
      [AppService,
        HttpClient,
        HttpTestingController],
      (appService: AppService,
        httpClient: HttpClient,
        httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testPath = '/';

        // force the forbidden request. Overrides DEFAULT_CORE_AUTORIZACION, must be restored
        appService.authorization.isAuthenticated = () => false;

        // execute the test call
        httpClient
          .get(testPath)
          .subscribe(
            response => {
              expect((<any>response)).toBe({ testResponse: false }); // if response the test is ko, then force error
            },
            error => {
              expect(error.name).toBe('ApiException');
              expect(error.message).toBe('Api service "/": Forbidden request path for not authenticated users.');
            }
          );

        // restore the property
        appService.authorization.isAuthenticated = () => true;
      })
  );

  describe('handling get requests', () => {

    it('should return data if there is correct response',
      inject(
        [AppService,
          HttpClient,
          HttpTestingController],
        (appService: AppService,
          httpClient: HttpClient,
          httpTestingController: HttpTestingController) => {

          // prepare the test data
          const testPath = '/';
          const testResponse = { testData: 'testData' };

          // execute the test call
          httpClient
            .get(testPath)
            .subscribe(
              response => {
                expect((<any>response)).toEqual(testResponse);
              });

          // expect that the get request happened and transmit the response
          // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
          const testRequest = httpTestingController.expectOne(appService.environment.apiBaseUrl + testPath);
          expect(testRequest.request.method).toEqual('GET');
          testRequest.flush(testResponse);

        })
    );

    it('should return ApiException if response not contains an Object',
      inject(
        [AppService,
          HttpClient,
          HttpTestingController],
        (appService: AppService,
          httpClient: HttpClient,
          httpTestingController: HttpTestingController) => {

          // prepare the test data
          const testPath = '/';
          const testResponse: string = null;

          // execute the test call
          httpClient
            .get(testPath)
            .subscribe(
              response => {
                expect((<any>response)).toBeUndefined(); // if response the test is ko, then force error
              },
              error => {
                expect(error.name).toBe('ApiException');
              });

          // expect that the get request happened and transmit the response
          // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
          const testRequest = httpTestingController.expectOne(appService.environment.apiBaseUrl + testPath);
          expect(testRequest.request.method).toEqual('GET');
          testRequest.flush(testResponse);

        })
    );

    it('should return ApiException if there is HTTP error',
      inject(
        [AppService,
          HttpClient,
          HttpTestingController],
        (appService: AppService,
          httpClient: HttpClient,
          httpTestingController: HttpTestingController) => {

          // prepare the test data
          const testPath = '/';

          // execute the test call
          httpClient
            .get(testPath)
            .subscribe(
              response => {
                expect((<any>response)).toBeUndefined(); // the test is ko, then force error
              },
              error => {
                expect(error.name).toBe('ApiException');
              });

          // expect that the get request happened and transmit the response
          // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
          const testRequest = httpTestingController.expectOne(appService.environment.apiBaseUrl + testPath);
          expect(testRequest.request.method).toEqual('GET');
          testRequest.error(new ErrorEvent('Unauthorized error'), {
            status: 401
          });

        })
    );

  });


  describe('handling post requests', () => {

    it('should return data if there is correct response',
      inject(
        [AppService,
          HttpClient,
          HttpTestingController],
        (appService: AppService,
          httpClient: HttpClient,
          httpTestingController: HttpTestingController) => {

          // prepare the test data
          const testPath = '/';
          const testResponse = { testData: 'testData' };

          // execute the test call
          httpClient
            .post(testPath, null)
            .subscribe(
              response => {
                expect((<any>response)).toEqual(testResponse);
              });

          // expect that the get request happened and transmit the response
          // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
          const testRequest = httpTestingController.expectOne(appService.environment.apiBaseUrl + testPath);
          expect(testRequest.request.method).toEqual('POST');
          testRequest.flush(testResponse);

        })
    );

    it('should return ApiException if response not contains an Object',
      inject(
        [AppService,
          HttpClient,
          HttpTestingController],
        (appService: AppService,
          httpClient: HttpClient,
          httpTestingController: HttpTestingController) => {

          // prepare the test data
          const testPath = '/';
          const testResponse: string = null;

          // execute the test call
          httpClient
            .post(testPath, null)
            .subscribe(
              response => {
                expect((<any>response)).toBeUndefined(); // the test is ko, then force error
              },
              error => {
                expect(error.name).toBe('ApiException');
              });

          // expect that the get request happened and transmit the response
          // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
          const testRequest = httpTestingController.expectOne(appService.environment.apiBaseUrl + testPath);
          expect(testRequest.request.method).toEqual('POST');
          testRequest.flush(testResponse);

        })
    );

    it('should return ApiException if there is HTTP error',
      inject(
        [AppService,
          HttpClient,
          HttpTestingController],
        (appService: AppService,
          httpClient: HttpClient,
          httpTestingController: HttpTestingController) => {

          // prepare the test data
          const testPath = '/';

          // execute the test call
          httpClient
            .post(testPath, null)
            .subscribe(
              response => {
                expect((<any>response)).toBeUndefined(); // the test is ko, then force error
              },
              error => {
                expect(error.name).toBe('ApiException');
              });

          // expect that the get request happened and transmit the response
          // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
          const testRequest = httpTestingController.expectOne(appService.environment.apiBaseUrl + testPath);
          expect(testRequest.request.method).toEqual('POST');
          testRequest.error(new ErrorEvent('Unauthorized error'), {
            status: 401
          });

        })
    );

  });

  describe('controls if there is active API calls', () => {

    it('when there is response',
      inject(
        [AppService,
          RestApiService,
          HttpClient,
          HttpTestingController],
        (appService: AppService,
          apiService: RestApiService,
          httpClient: HttpClient,
          httpTestingController: HttpTestingController) => {

          spyOn(apiService, 'addApiCall');
          spyOn(apiService, 'removeApiCall');

          // execute the test call
          httpClient
            .get('')
            .subscribe(
              response => {
                expect(apiService.addApiCall).toHaveBeenCalled();
                expect(apiService.removeApiCall).toHaveBeenCalled();
                expect(apiService.runningApiCalls).toBeFalsy();
              });

          // expect that the get request happened and transmit the response
          // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
          const testRequest = httpTestingController.expectOne(appService.environment.apiBaseUrl);
          expect(testRequest.request.method).toEqual('GET');
          testRequest.flush({});
        })
    );

    it('when response not contains an Object',
      inject(
        [AppService,
          RestApiService,
          HttpClient,
          HttpTestingController],
        (appService: AppService,
          apiService: RestApiService,
          httpClient: HttpClient,
          httpTestingController: HttpTestingController) => {

          spyOn(apiService, 'addApiCall');
          spyOn(apiService, 'removeApiCall');

          // execute the test call
          httpClient
            .get('')
            .subscribe(
              response => {
                expect((<any>response)).toBeUndefined(); // the test is ko, then force error
              },
              error => {
                expect(apiService.addApiCall).toHaveBeenCalled();
                expect(apiService.removeApiCall).toHaveBeenCalled();
                expect(apiService.runningApiCalls).toBeFalsy();
              });

          // expect that the get request happened and transmit the response
          // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
          const testRequest = httpTestingController.expectOne(appService.environment.apiBaseUrl);
          expect(testRequest.request.method).toEqual('GET');
          testRequest.flush(null);
        })
    );

    it('when there is HTTP error',
      inject(
        [AppService,
          RestApiService,
          HttpClient,
          HttpTestingController],
        (appService: AppService,
          apiService: RestApiService,
          httpClient: HttpClient,
          httpTestingController: HttpTestingController) => {

          spyOn(apiService, 'addApiCall');
          spyOn(apiService, 'removeApiCall');

          // execute the test call
          httpClient
            .get('')
            .subscribe(
              response => {
                expect((<any>response)).toBeUndefined(); // the test is ko, then force error
              },
              error => {
                expect(apiService.addApiCall).toHaveBeenCalled();
                expect(apiService.removeApiCall).toHaveBeenCalled();
                expect(apiService.runningApiCalls).toBeFalsy();
              });

          // expect that the get request happened and transmit the response
          // the http interceptor puts the domain in url from appService.environment.apiBaseUrl
          const testRequest = httpTestingController.expectOne(appService.environment.apiBaseUrl);
          expect(testRequest.request.method).toEqual('GET');
          testRequest.error(new ErrorEvent('Unauthorized error'), {
            status: 401
          });
        })
    );

  });

});
