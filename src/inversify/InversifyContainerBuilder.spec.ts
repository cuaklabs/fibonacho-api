import 'reflect-metadata';

import { Container, ContainerModule, injectable, interfaces } from 'inversify';

import { InversifyContainerBuilder } from './InversifyContainerBuilder';

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

describe('InversifyContainerBuilder', () => {
  let inversifyContainerBuilder: InversifyContainerBuilder;

  beforeAll(() => {
    inversifyContainerBuilder = new InversifyContainerBuilder();
  });

  describe('.build()', () => {
    describe('when called', () => {
      let result: unknown;

      beforeAll(async () => {
        result = await inversifyContainerBuilder.build([ContainerModuleMock]);
      });

      it('should return a inversify.Container instance with ContainerModuleMock loaded', () => {
        const expected: unknown = (result as Container).get(ModuleMock);

        expect(result).toBeInstanceOf(Container);
        expect(expected).toBeInstanceOf(ModuleMock);
      });
    });
  });
});
