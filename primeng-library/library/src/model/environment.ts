import { Environment as CoreEnvironment } from '../../x-shared/src/model/environment';



/**
 * Environment required properties for web library
 */
export interface Environment extends CoreEnvironment {

  /**
   * Localization required properties
   */
  localization: {
    msgInternalError: string;
    msgForbiddenPath: string;
    msgConfirmDeactivation: string;
    confirmationDefaultHeader: string,
    confirmationDefaultMessage: string,
    confirmationDefaultAcceptLabel: string,
    confirmationDefaultRejectLabel: string,
  };

}


/**
 * Default class for Environment
 */
export const EnvironmentDefault = <Environment>{
  debug: true,
  apiBaseUrl: 'null',
  localization: {
    msgInternalError: 'Internal error!',
    msgForbiddenPath: 'Sorry, you haven\'t authorization for this.',
    msgConfirmDeactivation: 'There is pending changes. Abort?',
    confirmationDefaultHeader: 'Confirm the action',
    confirmationDefaultMessage: 'Please, confirm the action',
    confirmationDefaultAcceptLabel: 'Accept',
    confirmationDefaultRejectLabel: 'CancelDefault'
  }
};
