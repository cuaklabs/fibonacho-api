
import { ApiV1SchemaId } from '../models/api/v1/ApiV1SchemaId';
import { apiV1SchemaIdToApiV1SchemaMap } from '../models/api/v1/apiV1SchemaIdToApiV1SchemaMap';
import { AjvService } from '../../ajv/AjvService';

export class ApiV1AjvService extends AjvService<ApiV1SchemaId> {
  constructor() {
    super(apiV1SchemaIdToApiV1SchemaMap);
  }
}
