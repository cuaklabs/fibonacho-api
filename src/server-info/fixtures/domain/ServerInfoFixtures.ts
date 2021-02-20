import { ServerInfo } from '../../models/domain/ServerInfo';

export class ServerInfoFixtures {
  public static get withAnything(): ServerInfo {
    const fixture: ServerInfo = {
      name: 'fibonacho-api',
      version: '1.2.3',
    };

    return fixture;
  }
}
