import { ContainerModule, interfaces } from 'inversify';

import { EnvVariablesLoader } from '../EnvVariablesLoader';
import { envVariablesLoaderInjectionTypes } from './envVariablesLoaderInjectionTypes';

export class ServerContainerModule extends ContainerModule {
  constructor() {
    const registry: interfaces.ContainerModuleCallBack = (
      bind: interfaces.Bind,
    ): void => {
      bind(envVariablesLoaderInjectionTypes.EnvVariablesLoader).toConstantValue(
        new EnvVariablesLoader(),
      );
    };

    super(registry);
  }
}
