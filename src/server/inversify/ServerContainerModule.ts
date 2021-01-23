import { ContainerModule, interfaces } from 'inversify';

export class ServerContainerModule extends ContainerModule {
  constructor() {
    const registry: interfaces.ContainerModuleCallBack = (
      _bind: interfaces.Bind,
    ): void => {
      throw new Error('No modules registered');
    };

    super(registry);
  }
}
