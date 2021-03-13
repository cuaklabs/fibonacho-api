import { ApiV1SchemaId } from '../models/api/v1/ApiV1SchemaId';
import { AjvTypeGuard } from './AjvTypeGuard';

export abstract class ApiV1AjvTypeGuard<TModel> extends AjvTypeGuard<
  TModel,
  ApiV1SchemaId
> {
  protected abstract readonly schemaId: ApiV1SchemaId;
}
