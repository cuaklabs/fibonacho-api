import { PackageInfoNpm } from '../../models/npm/PackageInfoNpm';

export class PackageInfoNpmFixtures {
  public static get withAny(): PackageInfoNpm {
    const fixture: PackageInfoNpm = {
      name: 'fibonacho-api',
      version: '1.2.3',
    };

    return fixture;
  }
}
