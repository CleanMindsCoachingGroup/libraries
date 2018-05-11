import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LogService } from './log.service';

/**
 * Injectable HttpClient proxy for all REST api services calls.
 */
@Injectable()
export class RestApiService {

  private runningCalls = 0; // tslint:disable-line:member-ordering

  /**
   * Flag activated when some Api call are running
   *
   * Automatically updated for {@link get}, {@link post}, {@link put}, {@link delete} and {@link patch} method calls
   */
  get runningApiCalls(): boolean { return this.runningCalls > 0; }

  /**
   * Add one API call for {@link runningApiCalls} flag.
   *
   * Automatically updated for {@link get}, {@link post}, {@link put}, {@link delete} and {@link patch} method calls
   */
  public addApiCall() { this.runningCalls += 1; }

  /**
   * Substract one API call for {@link runningApiCalls} flag
   *
   * Automatically updated for {@link get}, {@link post}, {@link put}, {@link delete} and {@link patch} method calls
   */
  public removeApiCall() { this.runningCalls -= 1; }


  constructor(
    private httpClient: HttpClient,
    private logService: LogService,
  ) {
    this.logService.info('RestApiService created.');
  }

  /**
   * Proxy to HttpClient get
   * @param path path of the request
   * @param params params of the request
   */
  get<T>(path: string, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
    return this.httpClient.get<T>(path, { params: params });
  }

  /**
   * Proxy to HttpClient post
   * @param path path of the request
   * @param params params of the request
   */
  post<T>(path: string, body: string): Observable<T> {
    return this.httpClient.post<T>(path, body);
  }

  /**
   * Proxy to HttpClient put
   * @param path path of the request
   * @param params params of the request
   */
  put<T>(path: string, body: string): Observable<T> {
    return this.httpClient.put<T>(path, body);
  }

  /**
   * Proxy to HttpClient delete
   * @param path path of the request
   * @param params params of the request
   */
  delete<T>(path: string, params?: HttpParams | { [param: string]: string | string[] }): Observable<T> {
    return this.httpClient.delete<T>(path, { params: params });
  }

  /**
   * Proxy to HttpClient patch
   * @param path path of the request
   * @param params params of the request
   */
  patch<T>(path: string, body: string): Observable<T> {
    return this.httpClient.patch<T>(path, body);
  }

}
