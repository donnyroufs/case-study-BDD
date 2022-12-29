import { Card } from "./Card"

export interface ICardRepository {
  findById(id: string): Promise<Card>
}
