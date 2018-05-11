/**
 * Exception base class.
 */
export class Exception extends Error {

  public name = 'Exception';
  public stack: string;
  public innerException: Exception | Error;



  /**
   * @param message
   * @param innerException
   */
  constructor(
    message: string,
    innerException?: Error,
  ) {
    super((message == undefined) ? '[no exception message]' : message);

    this.innerException = innerException || undefined;
    this.stack = (<any>new Error()).stack;

    // no LogService, logs directly to console
  }

}
