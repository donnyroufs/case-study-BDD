import { ATMMachine } from "./ATMMachine"
import { IAccountRepository } from "./IAccountRepository"
import { ICardRepository } from "./ICardRepository"
import { IDateService } from "./IDateService"
import { WithdrawCashRequest } from "./WithdrawCashRequest"
import { WithdrawCashResponse } from "./WithdrawCashResponse"

export class WithdrawCashUseCase {
  public constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _cardRepository: ICardRepository,
    private readonly _mockedDateService: IDateService
  ) {}

  public async execute(
    request: WithdrawCashRequest
  ): Promise<WithdrawCashResponse> {
    const atm = ATMMachine.getInstance()
    const card = await this._cardRepository.findById(request.cardId)
    const today = this._mockedDateService.getTodaysDate()

    if (atm.cash - request.amount < 0) {
      throw new Error("machine does not have enough funds")
    }

    if (!card.isValid(today)) {
      throw new Error("Card seems to be invalid")
    }

    const account = await this._accountRepository.findById(card.userId)

    account.withdraw(request.amount)

    await this._accountRepository.save(account)

    return new WithdrawCashResponse(request.amount)
  }
}
