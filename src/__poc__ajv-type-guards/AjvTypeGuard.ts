import { TypeGuard } from '../common/modules/TypeGuard';
import { AjvService } from './AjvService';


export abstract class AjvTypeGuard<TModel> implements TypeGuard<TModel> {
  protected abstract readonly schemaId: string;
  protected abstract readonly schemaUri: string;

  constructor(
    private readonly ajvContainer: AjvService = new AjvService()
  ) { }

  public is(value: unknown): value is TModel {
    return this.ajvContainer.validate(this.schemaId, value);
  }
}
