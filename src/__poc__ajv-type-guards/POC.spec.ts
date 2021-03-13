import 'reflect-metadata';

import { ApiV1AjvService } from '../common/modules/ApiV1AjvService';

import { UserApiV1UpdateQueryTypeGuard } from './UserApiV1UpdateQueryTypeGuard';

const value: unknown = JSON.parse(`
{
  "id": "c98bc7c8-2190-43d4-bb17-87ee49e03b36",
  "address": {
    "countries": "españa"
  }
}
`);
const value2: unknown = JSON.parse(`
{
}
`);

describe('POC', () => {
  it('works', async () => {
    const apiV1AjvService: ApiV1AjvService = new ApiV1AjvService();

    const ajvTypeguard: UserApiV1UpdateQueryTypeGuard = new UserApiV1UpdateQueryTypeGuard(
      apiV1AjvService,
    );

    expect(ajvTypeguard.is(value)).toBe(false);
    console.log(apiV1AjvService.ajv.errorsText());
    expect(ajvTypeguard.is(value2)).toBe(false);
    console.log(apiV1AjvService.ajv.errors);
  });
});
