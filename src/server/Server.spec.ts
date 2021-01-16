jest.mock('http');

import http from 'http';

jest.mock('express', () => jest.fn());

import express from 'express';

import { Server } from './Server';

class HttpServerMock {}

describe('Server', () => {
  describe('when instantiated', () => {
    let expressMock: jest.Mock;
    let server: Server;

    beforeAll(() => {
      expressMock = jest.fn();

      ((express as unknown) as jest.Mock).mockReturnValue(expressMock);
      (http.createServer as jest.Mock).mockReturnValue(new HttpServerMock());

      server = new Server();
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
});
