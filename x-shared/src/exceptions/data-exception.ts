import { Exception } from './exception';



/**
 * Exception for data errors.
 */
export class DataException extends Exception {

  public readonly name = 'DataException';

  /**
   * @param data Name or reference of data that throws exception
   * @param message
   */
  constructor(
    data: string,
    message: string
  ) {
    super(
      `${ (data == undefined) ? '[no exception data]' : data }, ${ (message == undefined) ? '[no exception message]' : message }`); // tslint:disable-line:max-line-length
  }
}
