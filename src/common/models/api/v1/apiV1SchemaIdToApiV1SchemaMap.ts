import * as ajv from 'ajv';

import UserApiV1AddressSchema from '../../../../__poc__ajv-type-guards/UserApiV1AddressSchema.json';
import UserApiV1UpdateQuerySchema from '../../../../__poc__ajv-type-guards/UserApiV1UpdateQuerySchema.json';
import { ApiV1SchemaId } from './ApiV1SchemaId';

export const apiV1SchemaIdToApiV1SchemaMap: {
  [key in ApiV1SchemaId]: ajv.AnySchema;
} = {
  [ApiV1SchemaId.UserApiV1Address]: UserApiV1AddressSchema,
  [ApiV1SchemaId.UserApiV1UpdateQuery]: UserApiV1UpdateQuerySchema,
};
