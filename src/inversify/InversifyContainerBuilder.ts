import { Container, ContainerModule } from 'inversify';

import { Builder } from '../common/modules/Builder';
import { EnvVariablesLoaderContainerModule } from '../env-variables-loader/inversify/EnvVariablesLoaderContainerModule';
import { ServerContainerModule } from '../server/inversify/ServerContainerModule';

type ContainerModuleConstructor = new () => ContainerModule;

export class InversifyContainerBuilder implements Builder<Container> {
  private readonly defaultContainerModulesToLoad: ContainerModuleConstructor[] = [
    EnvVariablesLoaderContainerModule,
    ServerContainerModule,
  ];

  public async build(
    containerModuleConstructors: ContainerModuleConstructor[] = this
      .defaultContainerModulesToLoad,
  ): Promise<Container> {
    const container: Container = new Container();

    await this.initialize(container, containerModuleConstructors);

    return container;
  }

  private async initialize(
    container: Container,
    containerModuleConstructors: ContainerModuleConstructor[],
  ): Promise<void> {
    const loadContainerModulePromises: Promise<void>[] = containerModuleConstructors.map(
      async (containerModuleConstructor: ContainerModuleConstructor) =>
        this.loadContainerModule(container, containerModuleConstructor),
    );

    await Promise.all(loadContainerModulePromises);
  }

  private async loadContainerModule(
    container: Container,
    containerModuleConstructor: ContainerModuleConstructor,
  ): Promise<void> {
    const containerModule: ContainerModule = new containerModuleConstructor();

    container.load(containerModule);
  }
}
