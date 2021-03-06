import 'reflect-metadata';

import * as ajv from 'ajv';

import { AjvService } from './AjvService';
import { AjvTypeGuard } from "./AjvTypeGuard";
import { ApiV1SchemaId } from './ApiV1SchemaId';
import { UserApiV1UpdateQuery } from "./UserApiV1UpdateQuery";
import { UserApiV1UpdateQueryTypeGuard } from "./UserApiV1UpdateQueryTypeGuard";

const value: unknown = JSON.parse(`
{
"id": "c98bc7c8-2190-43d4-bb17-87ee49e03b36"
}
`);

describe('POC', () => {
  it('works', async () => {
    const ajvService: AjvService = new AjvService();

    const validate: ajv.ValidateFunction = await ajvService.getSchemaAsync(ApiV1SchemaId.UserApiV1UpdateQuery);

    const ajvTypeguard: AjvTypeGuard<UserApiV1UpdateQuery> = new UserApiV1UpdateQueryTypeGuard();

    expect(ajvTypeguard.is(value)).toBe(true);
  });
});
