import { DataException } from '../../x-shared/src/exceptions/data-exception';



/**
 * User message for components
 */
export class UxMessage {

  /**
   * Values from primeng Message
   */
  static Severity = {
    Success: 'success',
    Info: 'info',
    Warning: 'warn',
    Error: 'error'
  };

  constructor(
    public severity: string,
    public code: number,
    public detail: string
  ) {
    if (severity == undefined ||
      (severity !== UxMessage.Severity.Success
        && severity !== UxMessage.Severity.Info
        && severity !== UxMessage.Severity.Warning
        && severity !== UxMessage.Severity.Error)
    ) {
      throw new DataException('severity', `invalid value: ${severity}`);
    }
    if (code == undefined) { throw new DataException('code', `invalid value: ${code}`); }
    if (detail == undefined) { throw new DataException('detail', `invalid value: ${detail}`); }
  }
}
