export interface Factory<TModule> {
  create(): Promise<TModule>;
}
