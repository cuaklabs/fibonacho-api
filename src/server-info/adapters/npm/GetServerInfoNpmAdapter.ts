import fs from 'fs';
import path from 'path';

import { inject } from 'inversify';

import { TypeGuard } from '../../../common/modules/TypeGuard';
import { npmInjectionTypes } from '../../../npm/inversify/npmInjectionTypes';
import { PackageInfoNpm } from '../../../npm/models/npm/PackageInfoNpm';
import { ServerInfo } from '../../models/domain/ServerInfo';
import { GetServerInfoAdapter } from '../GetServerInfoAdapter';

export class GetServerInfoNpmAdapter implements GetServerInfoAdapter {
  private readonly NPM_PACKAGE_DEFINITION_FILEPATH: string = path.join(
    process.cwd(),
    `package.json`,
  );

  constructor(
    @inject(npmInjectionTypes.PackageInfoNpmTypeGuard)
    private readonly packageInfoNpmTypeGuard: TypeGuard<PackageInfoNpm>
  ) {}

  public async getServerInfo(): Promise<ServerInfo> {
    const packageDefinitionNpm: unknown = JSON.parse(
      fs.readFileSync(this.NPM_PACKAGE_DEFINITION_FILEPATH).toString(),
    );

    if (this.packageInfoNpmTypeGuard.is(packageDefinitionNpm)) {
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
