import { Container, ContainerModule } from 'inversify';

import { Factory } from '../common/modules/Factory';
import { ServerContainerModule } from '../server/inversify/ServerContainerModule';

type ContainerModuleConstructor = new () => ContainerModule;

export class InversifyContainerFactory implements Factory<Container> {
  private readonly defaultContainerModulesToLoad: ContainerModuleConstructor[] = [
    ServerContainerModule,
  ];

  public async create(
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
