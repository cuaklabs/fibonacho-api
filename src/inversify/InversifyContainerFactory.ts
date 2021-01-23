import { Container } from 'inversify';

import { Factory } from '../common/modules/Factory';

export class InversifyContainerFactory implements Factory<Container> {
  public async create(): Promise<Container> {
    const container: Container = new Container();

    return container;
  }
}
