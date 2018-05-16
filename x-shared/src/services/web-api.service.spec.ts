import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Environment, EnvironmentDefault } from '../model/environment';
import { Authorization, AuthorizationDefault } from '../model/authorization';
import { AppService } from './app.service';
import { LogService } from './log.service';

import { WebApiService } from './web-api.service';

describe('WebApiService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppService,
        LogService,
        WebApiService,
      ]
    });
  });


  afterEach(inject([HttpTestingController], (httpTestingController: HttpTestingController) => {
    // ever, assert that there are no outstanding requests
    httpTestingController.verify();
  }));


  it('should instantiate',
    inject([WebApiService], (webApiService: WebApiService) => {
      expect(webApiService).toBeTruthy();
    })
  );


  it('do get requests', () => {

    inject(
      [WebApiService, HttpTestingController],
      (webApiService: WebApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        webApiService.get(
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
      [WebApiService, HttpTestingController],
      (webApiService: WebApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        webApiService.post(
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
      [WebApiService, HttpTestingController],
      (webApiService: WebApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        webApiService.put(
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
      [WebApiService, HttpTestingController],
      (webApiService: WebApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        webApiService.delete(
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
      [WebApiService, HttpTestingController],
      (webApiService: WebApiService, httpTestingController: HttpTestingController) => {

        // prepare the test data
        const testUrl = '/test';
        const testParms = { param: 'param' };
        const testResponse = { url: testUrl, parms: testParms };

        // execute the test call
        webApiService.patch(
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
      [WebApiService],
      (webApiService: WebApiService) => {
        webApiService.addApiCall();
        expect(webApiService.runningApiCalls).toBeTruthy();
        webApiService.removeApiCall();
        expect(webApiService.runningApiCalls).toBeFalsy();
      });
  });

});
