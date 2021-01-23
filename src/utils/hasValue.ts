export function hasValue<TType>(
  value: TType,
): value is Exclude<TType, null | undefined> {
  return value !== null && value !== undefined;
}
