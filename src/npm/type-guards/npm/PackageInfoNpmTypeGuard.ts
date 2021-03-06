import * as superstruct from 'superstruct';

import { TypeGuardSuperstruct } from '../../../common/modules/TypeGuardSuperstruct';
import { PackageInfoNpm } from '../../models/npm/PackageInfoNpm';

export class PackageInfoNpmTypeGuard extends TypeGuardSuperstruct<PackageInfoNpm> {
  constructor() {
    const schema: superstruct.Describe<PackageInfoNpm> = superstruct.type({
      name: superstruct.string(),
      version: superstruct.string(),
    });

    super(schema);
  }
}
