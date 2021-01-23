import 'reflect-metadata';

jest.mock('inversify');
import { Container } from 'inversify';

import { InversifyContainerFactory } from './InversifyContainerFactory';

describe('InversifyContainerFactory', () => {
  let inversifyContainerFactory: InversifyContainerFactory;

  beforeAll(() => {
    inversifyContainerFactory = new InversifyContainerFactory();
  });

  describe('.create()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await inversifyContainerFactory.create();
      });

      it('should return a inversify.Container instance', () => {
        expect(result).toBeInstanceOf(Container);
      });
    });
  });
});
