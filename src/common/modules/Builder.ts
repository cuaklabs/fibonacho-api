export interface Builder<TModel> {
  build(): Promise<TModel>;
}
