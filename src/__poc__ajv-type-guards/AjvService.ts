import fs from 'fs';
import path from 'path';

import Ajv, * as ajv from 'ajv';

import { Failure } from '../common/models/domain/Failure';
import { hasValue } from '../utils/hasValue';
import { ApiV1SchemaId } from './ApiV1SchemaId';
import { apiV1Schemas } from './apiV1Schemas';

export class AjvService {
  public readonly ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({
      loadSchema: async (uri: string): Promise<ajv.AnySchemaObject> => {
        const schemaFilepath: string = path.join(__dirname, uri);
        const jsonSchema: unknown = JSON.parse(
          fs.readFileSync(schemaFilepath).toString(),
        );

        return jsonSchema as ajv.AnySchemaObject;
      },
    });

    console.log(this.ajv.errors);
  }

  public validate<TModel>(schemaId: string, value: unknown): value is TModel {
    return this.ajv.validate(schemaId, value);
  }

  public getSchema<TModel>(
    schemaId: ApiV1SchemaId,
  ): ajv.ValidateFunction<TModel> {
    const validateFunction:
      | ajv.ValidateFunction<TModel>
      | undefined = this.ajv.getSchema<TModel>(schemaId);

    if (hasValue(validateFunction)) {
      return validateFunction;
    } else {
      throw new Failure('error');
    }
  }

  public async getSchemaAsync<TModel>(
    schemaId: ApiV1SchemaId,
  ): Promise<ajv.ValidateFunction<TModel>> {
    const validateFunction:
      | ajv.ValidateFunction<TModel>
      | undefined = await this.ajv.compileAsync<TModel>(
      apiV1Schemas[schemaId] as ajv.SchemaObject,
    );

    if (hasValue(validateFunction)) {
      return validateFunction;
    } else {
      throw new Failure('error');
    }
  }
}
