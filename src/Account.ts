export class Account {
  public get balance(): number {
    return this._balance
  }

  public constructor(public readonly id: string, private _balance: number) {}

  public withdraw(amount: number): void {
    if (this._balance - amount < 0) {
      throw new Error("not enough money")
    }

    this._balance -= amount
  }

  public static Builder = class {
    private readonly _props: any

    public constructor(template?: Partial<Account>) {
      this._props = {
        ...template,
      }
    }

    public setId(id: string): this {
      this._props.id = id
      return this
    }

    public setBalance(balance: number): this {
      this._props.balance = balance
      return this
    }

    public build(): Account {
      return new Account(this._props.id, this._props.balance)
    }
  }
}
