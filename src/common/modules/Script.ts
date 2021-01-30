import { Container } from 'inversify';

import { InversifyContainerFactory } from '../../inversify/InversifyContainerFactory';

export abstract class Script {
  protected container!: Container;

  public async run(): Promise<void> {
    await this.initialize();
    await this.execute();
  }

  protected async initialize(): Promise<void> {
    const inversifyContainerFactory: InversifyContainerFactory = new InversifyContainerFactory();

    this.container = await inversifyContainerFactory.create();
  }

  protected abstract execute(): Promise<void>;
}
