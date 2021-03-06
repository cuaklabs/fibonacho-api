import { AjvTypeGuard } from './AjvTypeGuard';
import { ApiV1SchemaId } from "./ApiV1SchemaId";
import { UserApiV1UpdateQuery } from "./UserApiV1UpdateQuery";


export class UserApiV1UpdateQueryTypeGuard extends AjvTypeGuard<UserApiV1UpdateQuery> {
  protected schemaId: string = ApiV1SchemaId.UserApiV1UpdateQuery;
}
