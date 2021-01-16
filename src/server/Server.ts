import http from 'http';

import express from 'express';

export class Server {
  public readonly httpServer: http.Server;

  private readonly expressServer: express.Express;

  constructor() {
    this.expressServer = express();

    this.httpServer = http.createServer(this.expressServer);
  }

  public async start(): Promise<void> {
    await this.startHttpServer(3000);

    console.log('Server started');
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
}
