import { inject, injectable } from 'inversify';

import { EnvVariablesLoader } from '../env-variables-loader/EnvVariablesLoader';
import { envVariablesLoaderInjectionTypes } from '../env-variables-loader/inversify/envVariablesLoaderInjectionTypes';

@injectable()
export class ServerConfig {
  public readonly port: number;

  constructor(
    @inject(envVariablesLoaderInjectionTypes.EnvVariablesLoader)
    private readonly envVariablesLoader: EnvVariablesLoader,
  ) {
    this.port = this.envVariablesLoader.envVariables.SERVER_PORT;
  }
}
