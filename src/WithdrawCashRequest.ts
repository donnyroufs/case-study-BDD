export class WithdrawCashRequest {
  public constructor(
    public readonly cardId: string,
    public readonly amount: number
  ) {}
}
