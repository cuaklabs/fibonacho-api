import path from 'path';

import dotenv from 'dotenv';
import envalid from 'envalid';
import { injectable } from 'inversify';

import { Failure } from '../common/models/domain/Failure';
import { hasValue } from '../utils/hasValue';
import { EnvVariables } from './models/EnvVariables';

@injectable()
export class EnvVariablesLoader {
  public get envVariables(): EnvVariables {
    if (hasValue(this.variables)) {
      return this.variables;
    } else {
      throw new Failure('Expected EnvVariables to be loaded');
    }
  }

  private readonly envalidValidators: {
    [TKey in keyof EnvVariables]: envalid.ValidatorSpec<EnvVariables[TKey]>;
  } = {
    SERVER_PORT: envalid.port(),
  };

  private readonly envFilepath: string;

  private readonly envName: string;

  private readonly defaultEnvName: string = '';

  private variables: EnvVariables | undefined;

  constructor() {
    this.envName = hasValue(process.env.ENV_DOTENV_NAME)
      ? process.env.ENV_DOTENV_NAME
      : this.defaultEnvName;

    const rootPath: string = path.resolve(__dirname, '../../');

    this.envFilepath = path.join(rootPath, `${this.envName}.env`);

    this.load();
  }

  public load(): void {
    this.populateProcessEnv();

    const cleanedEnv: EnvVariables = this.cleanEnv();

    this.setVariables(cleanedEnv);
  }

  private cleanEnv(): EnvVariables {
    const envalidOptions: envalid.CleanOptions = {
      dotEnvPath: this.envFilepath,
      strict: true,
    };

    const cleanEnv: EnvVariables = envalid.cleanEnv(
      process.env,
      this.envalidValidators,
      envalidOptions,
    );

    return cleanEnv;
  }

  private populateProcessEnv(): void {
    const dotenvOptions: dotenv.DotenvConfigOptions = {
      path: this.envFilepath,
    };

    dotenv.config(dotenvOptions);
  }

  private setVariables(env: EnvVariables): void {
    this.variables = {
      SERVER_PORT: env.SERVER_PORT,
    };
  }
}
