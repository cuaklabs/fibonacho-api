import { AjvService } from '../../ajv/AjvService';
import { TypeGuard } from './TypeGuard';

export abstract class AjvTypeGuard<TModel, TSchemaId>
  implements TypeGuard<TModel> {
  protected abstract readonly schemaId: TSchemaId;

  constructor(private readonly ajvService: AjvService<TSchemaId>) {}

  public is(value: unknown): value is TModel {
    return this.ajvService.validate(this.schemaId, value);
  }
}
