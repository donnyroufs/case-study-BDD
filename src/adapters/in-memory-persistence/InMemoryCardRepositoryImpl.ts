import { Card, ICardRepository } from "../../core"

export class InMemoryCardRepositoryImpl implements ICardRepository {
  private readonly _collection: Map<string, Card> = new Map()

  public constructor(cards: Card[] = []) {
    cards.forEach((card) => this._collection.set(card.id, card))
  }

  public async findById(id: string): Promise<Card> {
    return this._collection.get(id)!
  }
}
