import 'reflect-metadata';

jest.mock('inversify');

import { Container } from 'inversify';

jest.mock('../server/inversify/ServerContainerModule');

import { ServerContainerModule } from '../server/inversify/ServerContainerModule';
import { InversifyContainerFactory } from './InversifyContainerFactory';

describe('InversifyContainerFactory', () => {
  let inversifyContainerFactory: InversifyContainerFactory;

  beforeAll(() => {
    inversifyContainerFactory = new InversifyContainerFactory();
  });

  describe('.create()', () => {
    describe('when called', () => {
      let result: unknown;
      let containerMock: Container;

      beforeAll(async () => {
        containerMock = ({
          load: jest.fn(),
        } as Partial<Container>) as Container;

        ((Container as unknown) as jest.Mock).mockReturnValue(containerMock);
        result = await inversifyContainerFactory.create();
      });

      it('should load ServerContainerModule', () => {
        expect(ServerContainerModule).toHaveBeenCalledTimes(1);
        expect(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          (containerMock.load as jest.Mock).mock.calls[0][0],
        ).toBeInstanceOf(ServerContainerModule);
      });

      it('should return a inversify.Container instance', () => {
        expect(result).toStrictEqual(containerMock);
      });
    });
  });
});
