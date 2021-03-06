import * as ajv from 'ajv';

import { ApiV1SchemaId } from './ApiV1SchemaId';
import UserApiV1AddressSchema from './UserApiV1AddressSchema.json';
import UserApiV1UpdateQuerySchema from './UserApiV1UpdateQuerySchema.json';

type ApiV1Schemas = {
  [key in ApiV1SchemaId]: ajv.AnySchema;
};

export const apiV1Schemas: ApiV1Schemas = {
  UserApiV1Adress: UserApiV1AddressSchema,
  UserApiV1UpdateQuery: UserApiV1UpdateQuerySchema,
};


