import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Environment, EnvironmentDefault } from '../model/environment';
import { Authorization, AuthorizationDefault } from '../model/authorization';
import { AppService } from './app.service';
import { LogService } from './log.service';

import { RestApiService } from './rest-api.service';

describe('RestApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppService,
        LogService,
        RestApiService,
      ]
    });
  });


  afterEach(inject([HttpTestingController], (httpTestingController: HttpTestingController) => {
    // ever, assert that there are no outstanding requests
    httpTestingController.verify();
  }));


  it('should instantiate',
    inject([RestApiService], (apiService: RestApiService) => {
      expect(apiService).toBeTruthy();
    })
  );


  it('do get requests', () => {

    inject(
      [RestApiService, HttpTestingController],
      (apiService: RestApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        apiService.get(
          testUrl, testParms
        ).subscribe(
          response => {
            expect((<any>response).url).toEqual(testResponse);
          });

        // expect that the get request happened and transmit the response
        const testRequest = httpTestingController.expectOne(testUrl);
        expect(testRequest.request.method).toEqual('GET');
        testRequest.flush(testResponse);

      });
  });

  it('do post requests', () => {

    inject(
      [RestApiService, HttpTestingController],
      (apiService: RestApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        apiService.post(
          testUrl, JSON.stringify(testParms)
        ).subscribe(
          response => {
            expect((<any>response).url).toEqual(testResponse);
          });

        // expect that the get request happened and transmit the response
        const testRequest = httpTestingController.expectOne(testUrl);
        expect(testRequest.request.method).toEqual('GET');
        testRequest.flush(testResponse);

      });
  });

  it('do put requests', () => {

    inject(
      [RestApiService, HttpTestingController],
      (apiService: RestApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        apiService.put(
          testUrl, JSON.stringify(testParms)
        ).subscribe(
          response => {
            expect((<any>response).url).toEqual(testResponse);
          });

        // expect that the get request happened and transmit the response
        const testRequest = httpTestingController.expectOne(testUrl);
        expect(testRequest.request.method).toEqual('GET');
        testRequest.flush(testResponse);

      });
  });

  it('do delete requests', () => {

    inject(
      [RestApiService, HttpTestingController],
      (apiService: RestApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        apiService.delete(
          testUrl, testParms
        ).subscribe(
          response => {
            expect((<any>response).url).toEqual(testResponse);
          });

        // expect that the get request happened and transmit the response
        const testRequest = httpTestingController.expectOne(testUrl);
        expect(testRequest.request.method).toEqual('GET');
        testRequest.flush(testResponse);

      });
  });

  it('do patch requests', () => {

    inject(
      [RestApiService, HttpTestingController],
      (apiService: RestApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        apiService.patch(
          testUrl, JSON.stringify(testParms)
        ).subscribe(
          response => {
            expect((<any>response).url).toEqual(testResponse);
          });

        // expect that the get request happened and transmit the response
        const testRequest = httpTestingController.expectOne(testUrl);
        expect(testRequest.request.method).toEqual('GET');
        testRequest.flush(testResponse);

      });
  });

  it('can control the API calls', () => {
    inject(
      [RestApiService],
      (apiService: RestApiService) => {
        apiService.addApiCall();
        expect(apiService.runningApiCalls).toBeTruthy();
        apiService.removeApiCall();
        expect(apiService.runningApiCalls).toBeFalsy();
      });
  });

});
