import { ContainerModule, interfaces } from 'inversify';

export class NpmContainerModule extends ContainerModule {
  constructor() {
    const registry: interfaces.ContainerModuleCallBack = (
      _bind: interfaces.Bind,
    ): void => {
      return;
    };

    super(registry);
  }
}
