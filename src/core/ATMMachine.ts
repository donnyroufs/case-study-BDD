export class ATMMachine {
  private static _instance: ATMMachine
  private _cash: number

  public get cash(): number {
    return this._cash
  }

  private constructor(cash: number) {
    this._cash = cash
  }

  public static getInstance(): ATMMachine {
    if (!this._instance) {
      this._instance = new ATMMachine(100_000)
    }

    return this._instance
  }

  public setCash(cash: number): void {
    this._cash = cash
  }
}
