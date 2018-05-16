/**
 * Authorization required interface methods.
 *
 * Can be overrided by the application for its own authorization control purposes.
 */
export interface Authorization {

  /**
   * Function for autentication control, can be overrided for app's own control.
   * true by default
   */
  isAuthenticated(): boolean;

  /**
   * Function for route authorization, can be overrided for app's own control.
   * true by default
   */
  isAuthorizedRoutePath(routePath: string): boolean;

}


/**
 * Default class for Authorization
 */
export const AuthorizationDefault = <Authorization>{

  isAuthenticated: () => true,
  isAuthorizedRoutePath: (route: string) => true,

};
