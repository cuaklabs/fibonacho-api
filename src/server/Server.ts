import http from 'http';

import express from 'express';
import { inject, injectable } from 'inversify';

import { serverInjectionTypes } from './inversify/serverInjectionTypes';
import { ServerConfig } from './ServerConfig';

@injectable()
export class Server {
  public readonly httpServer: http.Server;
  private readonly expressServer: express.Express;

  constructor(
    @inject(serverInjectionTypes.ServerConfig)
    private readonly serverConfig: ServerConfig,
  ) {
    this.expressServer = express();

    this.httpServer = http.createServer(this.expressServer);
  }

  public async start(): Promise<void> {
    await this.startHttpServer(this.serverConfig.port);

    console.log(
      `Server running and listening on port ${this.serverConfig.port}`,
    );
  }

  public async stop(): Promise<void> {
    await this.stopHttpServer();
  }

  private async startHttpServer(port: number): Promise<void> {
    return new Promise(
      (
        resolve: (value: void | PromiseLike<void>) => void,
        reject: (reason: unknown) => void,
      ): void => {
        this.httpServer
          .listen(port)
          .once('listening', resolve)
          .once('error', reject);
      },
    );
  }

  private async stopHttpServer(): Promise<void> {
    return new Promise(
      (
        resolve: (value: void | PromiseLike<void>) => void,
        reject: (reason?: unknown) => void,
      ): void => {
        this.httpServer.close((err: Error | undefined): void => {
          if (err === undefined) {
            resolve();
          } else {
            reject(err);
          }
        });
      },
    );
  }
}
