import { injectable, unmanaged } from 'inversify';
import * as superstruct from 'superstruct';

import { TypeGuard } from './TypeGuard';

@injectable()
export abstract class TypeGuardSuperstruct<TModel>
  implements TypeGuard<TModel> {
  constructor(
    @unmanaged()
    public readonly schema: superstruct.Describe<TModel>,
  ) {}

  public is(value: unknown): value is TModel {
    return this.schema.is(value);
  }
}
