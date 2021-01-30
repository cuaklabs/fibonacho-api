import 'reflect-metadata';

jest.mock('http');

import http from 'http';

jest.mock('express', () => jest.fn());

import express from 'express';

import { EnvVariablesFixtures } from '../env-variables-loader/fixtures/EnvVariablesFixtures';
import { Server } from './Server';
import { ServerConfig } from './ServerConfig';

describe('Server', () => {
  let expressMock: jest.Mock;
  let httpServer: jest.Mocked<http.Server>;
  let server: Server;
  let serverConfig: ServerConfig;

  beforeAll(() => {
    expressMock = jest.fn();
    httpServer = ({
      close: jest
        .fn()
        .mockImplementation((callback?: (err?: Error) => void) => {
          if (callback !== undefined) {
            callback();
          }

          return httpServer;
        }),
      listen: jest.fn().mockReturnThis(),
      once: jest
        .fn()
        .mockImplementation((_eventName: string, callback: () => void) => {
          callback();
          return httpServer;
        }),
    } as Partial<http.Server>) as jest.Mocked<http.Server>;

    serverConfig = ({
      port: EnvVariablesFixtures.withAll.SERVER_PORT,
    } as Partial<ServerConfig>) as ServerConfig;

    ((express as unknown) as jest.Mock).mockReturnValue(expressMock);
    (http.createServer as jest.Mock).mockReturnValue(httpServer);

    server = new Server(serverConfig);
  });

  describe('when instantiated', () => {
    let server: Server;

    beforeAll(() => {
      jest.clearAllMocks();

      server = new Server(serverConfig);
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
      expect(server.httpServer).toStrictEqual(httpServer);
    });
  });

  describe('.start()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await server.start();
      });

      it('should call httpServer.listen()', () => {
        const expectedPort: number = 3000;

        expect(server.httpServer.listen).toHaveBeenCalledTimes(1);
        expect(server.httpServer.listen).toHaveBeenCalledWith(expectedPort);
      });

      it('should return nothing', () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('.close()', () => {
    describe('when called', () => {
      beforeAll(async () => {
        await server.stop();
      });

      it('should call httpServer.close()', () => {
        expect(server.httpServer.close).toHaveBeenCalledTimes(1);
      });
    });
  });
});
