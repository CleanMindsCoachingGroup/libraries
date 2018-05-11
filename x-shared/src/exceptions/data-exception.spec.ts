import { DataException } from './data-exception';

describe('DataException', () => {

  it('can instantiate with an argument and a message', () => {
    const dataException: DataException = new DataException('TestArgument', 'Test message');
    expect(dataException.message).toEqual('TestArgument, Test message');
  });

  it('can instantiate with null arguments and message, but default values are applied', () => {
    const dataException: DataException = new DataException(null, null);
    expect(dataException.message).toEqual('[no exception data], [no exception message]');
  });

  it('can instantiate with undefined arguments and message, but default values are applied', () => {
    const dataException = new DataException(undefined, undefined);
    expect(dataException.message).toEqual('[no exception data], [no exception message]');
  });
});
