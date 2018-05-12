// Angular library entry point
export * from './src/clean-minds-primeng.module';

// exported module configuration classes
export * from './src/model/clean-minds-primeng-library-config';

// exported core library singleton providers
export * from './x-shared/src/services/web-api.service';
export * from './x-shared/src/services/app.service';
export * from './x-shared/src/services/log.service';

// exported core library classes
export * from './x-shared/src/model/dto';
export * from './x-shared/src/model/entity-dto-adapter';
export * from './x-shared/src/model/entity-factory';
export * from './x-shared/src/model/entity';

// exported providers
export * from './src/services/ux.service';
export * from './src/services/navigation-guard.service';
export * from './src/services/can-deactivate-guard.service';
export * from './src/services/exception-handler';

// exported classes
export { Authorization } from './src/model/authorization';
export { Environment } from './src/model/environment';
export * from './src/model/ux-message';
