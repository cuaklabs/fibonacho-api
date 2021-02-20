import fs from 'fs';
import path from 'path';

import { ServerInfo } from '../../models/domain/ServerInfo';
import { GetServerInfoAdapter } from '../GetServerInfoAdapter';

export class GetServerInfoNpmAdapter implements GetServerInfoAdapter {
  private readonly NPM_PACKAGE_DEFINITION_FILEPATH: string = path.join(
    process.cwd(),
    `package.json`,
  );

  public async getServerInfo(): Promise<ServerInfo> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    const packageDefinitionNpm: unknown = JSON.parse(
      fs.readFileSync(NPM_PACKAGE_DEFINITION_FILEPATH).toString(),
    );

    if (isPackageDefinitionNpm(packageDefinitionNpm)) {
      const serverInfo: ServerInfo = {
        name: packageDefinitionNpm.name,
        version: packageDefinitionNpm.version,
      };

      return serverInfo;
    } else {
      throw new Error('Unknown NPM package definition schema');
    }
  }
}
