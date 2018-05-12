import { Exception } from './exception';



/**
 * Exception for API service errors.
 */
export class ApiException extends Exception {

  public readonly name = 'ApiException';

  /**
   * @param webApiService Name, path or reference of service that throws exception
   * @param message
   * @param innerException
   * @param additionalData Additional data for exception information
   */
  constructor(
    webApiService: string,
    message: string,
    innerException?: Error,
    additionalData?: any
  ) {
    super(
      `Web api service ${(webApiService == undefined) ? '[no api service]' : '"' + webApiService + '"'}: ${(message == undefined) ? '[no exception message]' : message}`, // tslint:disable-line:max-line-length
      innerException
    );
  }
}
