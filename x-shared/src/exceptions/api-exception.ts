import { Exception } from './exception';



/**
 * Exception for API service errors.
 */
export class ApiException extends Exception {

  public readonly name = 'ApiException';

  /**
   * @param apiService Name, path or reference of service that throws exception
   * @param message
   * @param innerException
   * @param additionalData Additional data for exception information
   */
  constructor(
    apiService: string,
    message: string,
    innerException?: Error,
    additionalData?: any
  ) {
    super(
      `Api service ${(apiService == undefined) ? '[no api service]' : '"' + apiService + '"'}: ${(message == undefined) ? '[no exception message]' : message}`, // tslint:disable-line:max-line-length
      innerException
    );
  }
}
