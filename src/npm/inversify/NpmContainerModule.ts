import { ContainerModule, interfaces } from 'inversify';

import { PackageInfoNpmTypeGuard } from '../type-guards/npm/PackageInfoNpmTypeGuard';
import { npmInjectionTypes } from './npmInjectionTypes';

export class NpmContainerModule extends ContainerModule {
  constructor() {
    const registry: interfaces.ContainerModuleCallBack = (
      bind: interfaces.Bind,
    ): void => {
      bind(npmInjectionTypes.PackageInfoNpmTypeGuard)
        .to(PackageInfoNpmTypeGuard)
        .inSingletonScope();
    };

    super(registry);
  }
}
