import { UxMessage } from './ux-message';



describe('UxMessage', () => {


  it('can instantiate with severity, code and detail', () => {
    const uxMessage: UxMessage = new UxMessage(UxMessage.Severity.Success, 0, 'Detail');
    expect(uxMessage.detail).toEqual('Detail');
  });


  it('throws error if the severity is null or undefined', () => {
    let uxMessage: UxMessage;
    expect(
      () => {
        uxMessage = new UxMessage(null, null, null);
      }
    ).toThrowError(/severity, invalid value: null/);
  });


  it('throws error if the severity is ivalid', () => {
    let uxMessage: UxMessage;
    expect(
      () => {
        uxMessage = new UxMessage('none', null, null);
      }
    ).toThrowError(/severity, invalid value: none/);
  });


  it('throws error if the code is null or undefined', () => {
    let uxMessage: UxMessage;
    expect(
      () => {
        uxMessage = new UxMessage(UxMessage.Severity.Success, null, null);
      }
    ).toThrowError(/code, invalid value: null/);
  });


  it('throws error if the detail is null or undefined', () => {
    let uxMessage: UxMessage;
    expect(
      () => {
        uxMessage = new UxMessage(UxMessage.Severity.Success, 0, null);
      }
    ).toThrowError(/detail, invalid value: null/);
  });
});
