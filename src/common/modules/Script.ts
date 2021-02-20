import { Container } from 'inversify';

import { InversifyContainerBuilder } from '../../inversify/InversifyContainerBuilder';

export abstract class Script {
  protected container!: Container;

  public async run(): Promise<void> {
    await this.initialize();
    await this.execute();
  }

  protected async initialize(): Promise<void> {
    const inversifyContainerBuilder: InversifyContainerBuilder = new InversifyContainerBuilder();

    this.container = inversifyContainerBuilder.build();
  }

  protected abstract execute(): Promise<void>;
}
