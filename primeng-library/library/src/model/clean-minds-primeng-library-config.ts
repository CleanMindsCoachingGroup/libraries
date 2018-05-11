import { AppServiceConfig } from '../../x-shared/src/model/app-service-config';
import { Environment } from './environment';
import { Authorization } from './authorization';


/**
 * Clean Minds PrimeNg Application Module configuration class
 */
export class CleanMindsPrimengLibraryConfig extends AppServiceConfig {
  environment?: Environment;
  authorization?: Authorization;
}
