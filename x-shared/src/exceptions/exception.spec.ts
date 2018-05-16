import { Exception } from './exception';

describe('Exception', () => {


  it('can instantiate', () => {
    const exception: Exception = new Exception('Test message');
    expect(exception.message).toEqual('Test message');
    expect(exception.stack).not.toBe(null);
    expect(exception.toString()).not.toBe(null);
  });


  it('can instantiate with null message, but default values applied', () => {
    const exception = new Exception(null);
    expect(exception.message).toEqual('[no exception message]');
  });


  it('can instantiate with undefined message, but default values applied', () => {
    const exception = new Exception(undefined);
    expect(exception.message).toEqual('[no exception message]');
  });
});
