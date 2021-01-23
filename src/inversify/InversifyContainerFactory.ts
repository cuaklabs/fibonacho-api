import { Container, ContainerModule } from 'inversify';

import { Factory } from '../common/modules/Factory';
import { ServerContainerModule } from '../server/inversify/ServerContainerModule';

export class InversifyContainerFactory implements Factory<Container> {
  public async create(): Promise<Container> {
    const container: Container = new Container();

    await this.initialize(container);

    return container;
  }

  private async initialize(container: Container): Promise<void> {
    await Promise.all([
      this.loadContainerModule(container, ServerContainerModule),
    ]);
  }

  private async loadContainerModule<TContainerModule extends ContainerModule>(
    container: Container,
    containerModuleConstructor: new () => TContainerModule,
  ): Promise<void> {
    const containerModule: TContainerModule = new containerModuleConstructor();

    container.load(containerModule);
  }
}
