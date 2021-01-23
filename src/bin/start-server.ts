import 'reflect-metadata';

import { Container } from 'inversify';

import { ExitCode } from '../common/models/node/ExitCode';
import { InversifyContainerFactory } from '../inversify/InversifyContainerFactory';
import { serverInjectionTypes } from '../server/inversify/serverInjectionTypes';
import { Server } from '../server/Server';

async function main() {
  try {
    const inversifyContainerFactory: InversifyContainerFactory = new InversifyContainerFactory();
    const container: Container = await inversifyContainerFactory.create();
    const server: Server = container.get(serverInjectionTypes.Server);

    await server.start();
  } catch (err: unknown) {
    console.error(err);

    process.exit(ExitCode.ERROR);
  }
}

void main();
