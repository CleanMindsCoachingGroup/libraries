// Angular library entry point
export * from './src/clean-minds-primeng.module';

// exported module configuration classes
export * from './src/model/clean-minds-primeng-library-config';

// exported core library singleton providers
export * from './x-shared/src/providers/web-api.service';
export * from './x-shared/src/providers/app.service';
export * from './x-shared/src/providers/log.service';

// exported core library classes
export * from './x-shared/src/model/dto';
export * from './x-shared/src/model/entity-dto-adapter';
export * from './x-shared/src/model/entity-factory';
export * from './x-shared/src/model/entity';

// exported providers
export * from './src/providers/ux.service';
export * from './src/providers/navigation-guard.service';
export * from './src/providers/ux-form-group-observer';
export * from './src/providers/cancellation-guard.service';
export * from './src/providers/exception-handler';

// exported classes
export { Authorization } from './src/model/authorization';
export { Environment } from './src/model/environment';
export * from './src/model/ux-message';
