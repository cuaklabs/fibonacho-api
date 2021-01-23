import 'reflect-metadata';

import { Container, ContainerModule, injectable, interfaces } from 'inversify';

import { InversifyContainerFactory } from './InversifyContainerFactory';

@injectable()
class ModuleMock {}

class ContainerModuleMock extends ContainerModule {
  constructor() {
    const registry: interfaces.ContainerModuleCallBack = (
      bind: interfaces.Bind,
    ): void => {
      bind(ModuleMock).to(ModuleMock);
    };

    super(registry);
  }
}

describe('InversifyContainerFactory', () => {
  let inversifyContainerFactory: InversifyContainerFactory;

  beforeAll(() => {
    inversifyContainerFactory = new InversifyContainerFactory();
  });

  describe('.create()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await inversifyContainerFactory.create([ContainerModuleMock]);
      });

      it('should return a inversify.Container instance with ContainerModuleMock loaded', () => {
        const expected: unknown = (result as Container).get(ModuleMock);

        expect(result).toBeInstanceOf(Container);
        expect(expected).toBeInstanceOf(ModuleMock);
      });
    });
  });
});
