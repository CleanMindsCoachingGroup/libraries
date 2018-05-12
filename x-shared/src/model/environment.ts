/**
 * Environment required interface properties.
 *
 * Can be overrided by the application's Angular environment for its own configuration purposes.
 */
export interface Environment {

  /**
   * Logging debug mode
   */
  debug: boolean;

  /**
   * REST API base URL
   */
  apiBaseUrl: string;

}


/**
 * Default class for Environment
 */
export const EnvironmentDefault = <Environment> {
  debug: true,
  apiBaseUrl: 'null',
};
