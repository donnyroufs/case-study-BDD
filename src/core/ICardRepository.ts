import { Card } from "./core/Card"

export interface ICardRepository {
  findById(id: string): Promise<Card>
}
