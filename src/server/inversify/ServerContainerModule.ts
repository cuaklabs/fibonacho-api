import { ContainerModule, interfaces } from 'inversify';

import { Server } from '../Server';
import { ServerConfig } from '../ServerConfig';
import { serverInjectionTypes } from './serverInjectionTypes';

export class ServerContainerModule extends ContainerModule {
  constructor() {
    const registry: interfaces.ContainerModuleCallBack = (
      bind: interfaces.Bind,
    ): void => {
      bind(serverInjectionTypes.Server).to(Server);
      bind(serverInjectionTypes.ServerConfig)
        .to(ServerConfig)
        .inSingletonScope();
    };

    super(registry);
  }
}
