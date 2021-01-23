import { FailureType } from './FailureType';

export class Failure extends Error {
  constructor(
    public readonly message: string,
    public readonly type: FailureType = FailureType.Unknown,
  ) {
    super(message);
  }
}
