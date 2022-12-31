import { ATMMachine } from "./ATMMachine"
import { IAccountRepository } from "./ports/IAccountRepository"
import { ICardRepository } from "./ports/ICardRepository"
import { IDateService } from "./ports/IDateService"
import { WithdrawCashRequest } from "./WithdrawCashRequest"
import { WithdrawCashResponse } from "./WithdrawCashResponse"
import { IUseCase } from "../shared/IUseCase"

export class WithdrawCashUseCase
  implements IUseCase<WithdrawCashRequest, WithdrawCashResponse>
{
  public constructor(
    private readonly _accountRepository: IAccountRepository,
    private readonly _cardRepository: ICardRepository,
    private readonly _dateService: IDateService
  ) {}

  public async execute(
    request: WithdrawCashRequest
  ): Promise<WithdrawCashResponse> {
    const atm = ATMMachine.getInstance()
    const card = await this._cardRepository.findById(request.cardId)
    const today = this._dateService.getTodaysDate()

    if (atm.cash - request.amount < 0) {
      throw new Error("machine does not have enough funds")
    }

    if (!card.isValid(today)) {
      throw new Error("Card seems to be invalid")
    }

    const account = await this._accountRepository.findById(card.userId)

    account.withdraw(request.amount)

    await this._accountRepository.save(account)

    return new WithdrawCashResponse(request.amount, account.balance)
  }
}
