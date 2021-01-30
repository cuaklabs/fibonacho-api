import 'reflect-metadata';

import { Container } from 'inversify';

import { ExitCode } from '../common/models/node/ExitCode';
import { ProcessSignal } from '../common/models/node/ProcessSignal';
import { InversifyContainerFactory } from '../inversify/InversifyContainerFactory';
import { serverInjectionTypes } from '../server/inversify/serverInjectionTypes';
import { Server } from '../server/Server';

function createCloseSignalListener(server: Server): NodeJS.SignalsListener {
  const closeSignalListener: NodeJS.SignalsListener = async (
    signal: NodeJS.Signals,
  ): Promise<void> => {
    try {
      console.log(`${signal} received`);

      await server.stop();
    } catch (err: unknown) {
      console.error(err);

      process.exit(ExitCode.ERROR);
    }
  };

  return closeSignalListener;
}

async function main() {
  try {
    const inversifyContainerFactory: InversifyContainerFactory = new InversifyContainerFactory();
    const container: Container = await inversifyContainerFactory.create();
    const server: Server = container.get(serverInjectionTypes.Server);

    await server.start();

    process.once(ProcessSignal.SIGINT, createCloseSignalListener(server));
    process.once(ProcessSignal.SIGTERM, createCloseSignalListener(server));
  } catch (err: unknown) {
    console.error(err);

    process.exit(ExitCode.ERROR);
  }
}

void main();
