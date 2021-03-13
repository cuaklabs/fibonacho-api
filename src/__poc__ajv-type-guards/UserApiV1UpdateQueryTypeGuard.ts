import { ApiV1AjvTypeGuard } from '../common/modules/ApiV1AjvTypeGuard';
import { ApiV1SchemaId } from '../common/models/api/v1/ApiV1SchemaId';
import { UserApiV1UpdateQuery } from './UserApiV1UpdateQuery';

export class UserApiV1UpdateQueryTypeGuard extends ApiV1AjvTypeGuard<UserApiV1UpdateQuery> {
  protected schemaId: ApiV1SchemaId = ApiV1SchemaId.UserApiV1UpdateQuery;
}
