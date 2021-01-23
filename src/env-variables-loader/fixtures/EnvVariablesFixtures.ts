import { EnvVariables } from '../models/EnvVariables';

export class EnvVariablesFixtures {
  public static get withAll(): EnvVariables {
    const fixture: EnvVariables = {
      SERVER_PORT: 3000,
    };

    return fixture;
  }
}
