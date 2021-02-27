import { PackageInfoNpm } from '../../models/npm/PackageInfoNpm';

export class PackageInfoNpmFixtures {
  public static get withAny(): PackageInfoNpm {
    const fixture: PackageInfoNpm = {
      name: 'test',
      version: '3.14.57',
    };

    return fixture;
  }
}
