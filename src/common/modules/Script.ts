import { Container } from 'inversify';

import { InversifyContainerBuilder } from '../../inversify/InversifyContainerBuilder';

export abstract class Script {
  protected container: Container;

  constructor() {
    const inversifyContainerBuilder: InversifyContainerBuilder = new InversifyContainerBuilder();

    this.container = inversifyContainerBuilder.build();
  }

  public abstract run(): Promise<void>;
}
