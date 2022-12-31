export class WithdrawCashResponse {
  public constructor(
    public readonly cash: number,
    public readonly newBalance: number
  ) {}
}
