import 'reflect-metadata';

import { EnvVariablesLoader } from '../env-variables-loader/EnvVariablesLoader';
import { EnvVariablesFixtures } from '../env-variables-loader/fixtures/EnvVariablesFixtures';
import { ServerConfig } from './ServerConfig';

describe('ServerConfig', () => {
  describe('when instantiated', () => {
    let envVariablesLoader: EnvVariablesLoader;
    let serverConfig: ServerConfig;

    beforeAll(() => {
      envVariablesLoader = ({
        envVariables: EnvVariablesFixtures.withAll,
      } as Partial<EnvVariablesLoader>) as EnvVariablesLoader;

      serverConfig = new ServerConfig(envVariablesLoader);
    });

    it('should have all its properties set', () => {
      expect(serverConfig.port).toStrictEqual(
        envVariablesLoader.envVariables.SERVER_PORT,
      );
    });
  });
});
