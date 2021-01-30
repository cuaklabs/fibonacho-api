import 'reflect-metadata';

import { ExitCode } from '../common/models/node/ExitCode';
import { ProcessSignal } from '../common/models/node/ProcessSignal';
import { Script } from '../common/modules/Script';
import { serverInjectionTypes } from '../server/inversify/serverInjectionTypes';
import { Server } from '../server/Server';

class StartServerScript extends Script {
  private server!: Server;

  protected async execute() {
    this.server = this.container.get(serverInjectionTypes.Server);

    await this.server.start();

    process.once(
      ProcessSignal.SIGINT,
      this.createCloseSignalListener.bind(this),
    );
    process.once(
      ProcessSignal.SIGTERM,
      this.createCloseSignalListener.bind(this),
    );
  }

  private createCloseSignalListener(signal: NodeJS.Signals): void {
    try {
      console.log(`${signal} received`);

      void this.server.stop();
    } catch (err: unknown) {
      console.error(err);

      process.exit(ExitCode.ERROR);
    }
  }
}

void new StartServerScript().run();
