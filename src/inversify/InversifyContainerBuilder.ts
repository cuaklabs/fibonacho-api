import { Container, ContainerModule } from 'inversify';

import { Builder } from '../common/modules/Builder';
import { EnvVariablesLoaderContainerModule } from '../env-variables-loader/inversify/EnvVariablesLoaderContainerModule';
import { ServerInfoContainerModule } from '../server-info/inversify/ServerInfoContainerModule';
import { ServerContainerModule } from '../server/inversify/ServerContainerModule';

type ContainerModuleConstructor = new () => ContainerModule;

export class InversifyContainerBuilder implements Builder<Container> {
  private readonly defaultContainerModulesToLoad: ContainerModuleConstructor[] = [
    EnvVariablesLoaderContainerModule,
    ServerContainerModule,
    ServerInfoContainerModule,
  ];

  public build(
    containerModuleConstructors: ContainerModuleConstructor[] = this
      .defaultContainerModulesToLoad,
  ): Container {
    const container: Container = new Container();

    this.initialize(container, containerModuleConstructors);

    return container;
  }

  private initialize(
    container: Container,
    containerModuleConstructors: ContainerModuleConstructor[],
  ): void {
    containerModuleConstructors.map(
      async (containerModuleConstructor: ContainerModuleConstructor) =>
        this.loadContainerModule(container, containerModuleConstructor),
    );
  }

  private loadContainerModule(
    container: Container,
    containerModuleConstructor: ContainerModuleConstructor,
  ): void {
    const containerModule: ContainerModule = new containerModuleConstructor();

    container.load(containerModule);
  }
}
