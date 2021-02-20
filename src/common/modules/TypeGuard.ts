export interface TypeGuard<TModel> {
  is(value: unknown): value is TModel;
}
