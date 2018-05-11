// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  /**
   * Logging debug mode
   */
  debug: true,

  /**
   * REST API base URL
   */
  apiBaseUrl: 'http://integration/',

  /**
   * Localization required properties
   */
  localization: {
    msgInternalError: 'Internal error!',
    msgConfirmDeactivation: 'There is pending changes. Abort?',
    msgForbiddenPath: 'Sorry, you haven\'t authorization for this.',
    confirmationDefaultHeader: 'Confirm the action',
    confirmationDefaultMessage: 'Please, confirm the action',
    confirmationDefaultAcceptLabel: 'Accept',
    confirmationDefaultRejectLabel: 'Cancel'
  }
};
