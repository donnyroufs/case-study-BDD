export class ATMMachine {
  private static _instance: ATMMachine

  private constructor(public readonly cash: number) {}

  public static getInstance(): ATMMachine {
    if (!this._instance) {
      this._instance = new ATMMachine(100_000)
    }

    return this._instance
  }
}
