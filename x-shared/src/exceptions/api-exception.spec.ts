import { ApiException } from './api-exception';

describe('ApiException', () => {


  it('can instantiate with an service name and a message', () => {
    const apiException: ApiException = new ApiException('TestService', 'Test message');
    expect(apiException.message).toEqual('Web api service "TestService": Test message');
  });


  it('can instantiate with null service name and message, but default values are applied', () => {
    const apiException: ApiException = new ApiException(null, null);
    expect(apiException.message).toEqual('Web api service [no api service]: [no exception message]');
  });


  it('can instantiate with undefined service name and message, but default values are applied', () => {
    const apiException = new ApiException(undefined, undefined);
    expect(apiException.message).toEqual('Web api service [no api service]: [no exception message]');
  });
});
