import http from 'http';

import express from 'express';

export class Server {
  public readonly httpServer: http.Server;

  private readonly expressServer: express.Express;

  constructor() {
    this.expressServer = express();

    this.httpServer = http.createServer(this.expressServer);
  }
}
