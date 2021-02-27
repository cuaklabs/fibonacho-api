import { ContainerModule, interfaces } from 'inversify';
import { GetServerInfoNpmAdapter } from '../adapters/npm/GetServerInfoNpmAdapter';
import { serverInfoInjectionTypes } from './serverInfoInjectionTypes';

export class ServerInfoContainerModule extends ContainerModule {
  constructor() {
    const registry: interfaces.ContainerModuleCallBack = (
      bind: interfaces.Bind,
    ): void => {
      bind(serverInfoInjectionTypes.GetServerInfoNpmAdapter).to(
        GetServerInfoNpmAdapter,
      );
    };

    super(registry);
  }
}
