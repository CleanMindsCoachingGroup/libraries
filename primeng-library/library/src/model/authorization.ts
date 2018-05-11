import { Authorization as CoreAuthorization } from '../../x-shared/src/model/authorization';



/**
 * Authorization required properties for web library
 */
export interface Authorization extends CoreAuthorization {

  // TODO: Añadir info
  info: string;

}

/**
 * Default class for Authorization
 */
export const AuthorizationDefault = <Authorization> {
  isAuthenticated: () => true,
  isAuthorizedRoutePath: (route: string) => true,
  info: undefined,
};
