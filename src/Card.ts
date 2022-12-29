export class Card {
  public constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly expires: Date
  ) {}

  public isValid(today: Date): boolean {
    return today < this.expires
  }

  public static Builder = class {
    private readonly _props: any

    public constructor(template?: Partial<Card>) {
      this._props = {
        ...template,
      }
    }

    public setId(id: string): this {
      this._props.id = id
      return this
    }

    public setUserId(userId: string): this {
      this._props.userId = userId
      return this
    }

    public setExpires(date: Date): this {
      this._props.expires = date

      return this
    }

    public build(): Card {
      return new Card(this._props.id, this._props.userId, this._props.expires)
    }
  }
}
