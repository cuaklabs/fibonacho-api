import 'reflect-metadata';

jest.mock('http');

import http from 'http';

jest.mock('express', () => jest.fn());

import express from 'express';

import { Server } from './Server';

class HttpServerMock {
  public listen: jest.Mock = jest.fn().mockReturnThis();
  public once: jest.Mock = jest.fn().mockReturnThis();
}

describe('Server', () => {
  let expressMock: jest.Mock;
  let httpServerMock: http.Server;
  let server: Server;

  beforeAll(() => {
    expressMock = jest.fn();
    httpServerMock = (new HttpServerMock() as unknown) as http.Server;

    ((express as unknown) as jest.Mock).mockReturnValue(expressMock);
    (http.createServer as jest.Mock).mockReturnValue(httpServerMock);

    server = new Server();
  });

  describe('when instantiated', () => {
    let server: Server;

    beforeAll(() => {
      jest.clearAllMocks();

      server = new Server();
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should call express()', () => {
      expect(express).toHaveBeenCalledTimes(1);
    });

    it('should call http.createServer()', () => {
      expect(http.createServer).toHaveBeenCalledTimes(1);
      expect(http.createServer).toHaveBeenCalledWith(expressMock);
    });

    it('should have an httpServer property', () => {
      expect(server.httpServer).toBeInstanceOf(HttpServerMock);
    });
  });

  describe('.start()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        (httpServerMock.once as jest.Mock).mockImplementationOnce(
          (_eventName: string, callback: () => void) => {
            callback();
          },
        );

        result = await server.start();
      });

      it('should call httpServer.listen()', () => {
        const expectedPort: number = 3000;

        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(server.httpServer.listen).toHaveBeenCalledTimes(1);
        // eslint-disable-next-line @typescript-eslint/unbound-method
        expect(server.httpServer.listen).toHaveBeenCalledWith(expectedPort);
      });

      it('should return nothing', () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
