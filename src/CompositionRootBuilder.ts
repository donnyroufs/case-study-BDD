import {
  Account,
  Card,
  IAccountRepository,
  ICardRepository,
  IDateService,
  WithdrawCashUseCase,
} from "./core"
import { InMemoryAccountRepositoryImpl } from "./adapters/in-memory-persistence/InMemoryAccountRepositoryImpl"
import { InMemoryCardRepositoryImpl } from "./adapters/in-memory-persistence/InMemoryCardRepositoryImpl"
import { DateServiceImpl } from "./adapters/date-service/DateServiceImpl"

export interface ICompositionRoot {
  withdrawCashUseCase: WithdrawCashUseCase
  accountRepository: IAccountRepository
  cardRepository: ICardRepository
  dateService: IDateService
}

export class CompositionRootBuilder {
  private _accounts: Account[] = []
  private _cards: Card[] = []

  public addCard(card: Card): this {
    this._cards.push(card)
    return this
  }

  public addAccount(account: Account): this {
    this._accounts.push(account)
    return this
  }

  public build(): ICompositionRoot {
    const accountRepository = new InMemoryAccountRepositoryImpl(this._accounts)
    const cardRepository = new InMemoryCardRepositoryImpl(this._cards)
    const dateService = new DateServiceImpl()

    const withdrawCashUseCase = new WithdrawCashUseCase(
      accountRepository,
      cardRepository,
      dateService
    )

    return {
      accountRepository,
      cardRepository,
      dateService,
      withdrawCashUseCase,
    }
  }
}
