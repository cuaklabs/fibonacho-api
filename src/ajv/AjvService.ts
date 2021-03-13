import Ajv, * as ajv from 'ajv';

interface AjvSchemaDictionary {
  [x: string]: ajv.AnySchema | undefined;
}

export abstract class AjvService<TSchemaId> {
  public readonly ajv: Ajv;

  constructor(schemas: AjvSchemaDictionary) {
    this.ajv = new Ajv({
      schemas: schemas,
    });
  }

  public validate<TModel>(
    schemaId: TSchemaId,
    value: unknown,
  ): value is TModel {
    return this.ajv.validate(schemaId, value);
  }
}
