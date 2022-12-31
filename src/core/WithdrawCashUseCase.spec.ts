import { mock } from "jest-mock-extended"
import { Account } from "./Account"
import { Card } from "./Card"
import { IAccountRepository } from "./ports/IAccountRepository"
import { ICardRepository } from "./ports/ICardRepository"
import { IDateService } from "./ports/IDateService"
import { WithdrawCashRequest } from "./WithdrawCashRequest"
import { WithdrawCashResponse } from "./WithdrawCashResponse"
import { WithdrawCashUseCase } from "./WithdrawCashUseCase"

describe("WithdrawCashUseCase", () => {
  let sut: WithdrawCashUseCase
  const mockedAccountRepository = mock<IAccountRepository>()
  const mockedCardRepository = mock<ICardRepository>()
  const mockedDateService = mock<IDateService>()

  beforeAll(() => {
    mockedDateService.getTodaysDate.mockReturnValue(new Date("2023"))
  })

  beforeEach(() => {
    sut = new WithdrawCashUseCase(
      mockedAccountRepository,
      mockedCardRepository,
      mockedDateService
    )
  })

  test("when asked more money than the machine currently has we reject", async () => {
    const card = new Card.Builder()
      .setId("cardId")
      .setUserId("userId")
      .setExpires(new Date("2100"))
      .build()
    const account = new Account.Builder()
      .setId("accountId")
      .setBalance(101_000)
      .build()

    mockedCardRepository.findById.mockResolvedValue(card)
    mockedAccountRepository.findById.mockResolvedValue(account)

    const result = (): Promise<WithdrawCashResponse> =>
      sut.execute(new WithdrawCashRequest(account.id, 101_000))

    expect(result).rejects.toThrowError()
  })

  test("rejects the card when invalid", async () => {
    const card = new Card.Builder()
      .setId("cardId")
      .setUserId("userId")
      .setExpires(new Date("2004"))
      .build()
    const account = new Account.Builder()
      .setId("accountId")
      .setBalance(50)
      .build()

    mockedCardRepository.findById.mockResolvedValue(card)
    mockedAccountRepository.findById.mockResolvedValue(account)

    const result = (): Promise<WithdrawCashResponse> =>
      sut.execute(new WithdrawCashRequest(account.id, expect.any(Number)))

    expect(result).rejects.toThrowError()
  })

  test("returns the asked amount when I have enough money", async () => {
    const card = new Card.Builder()
      .setId("cardId")
      .setUserId("userId")
      .setExpires(new Date("2100"))
      .build()
    const account = new Account.Builder()
      .setId("accountId")
      .setBalance(50)
      .build()

    mockedCardRepository.findById.mockResolvedValue(card)
    mockedAccountRepository.findById.mockResolvedValue(account)

    const askedAmount = 50

    const result = await sut.execute(
      new WithdrawCashRequest(account.id, askedAmount)
    )

    expect(result.cash).toBe(askedAmount)
  })

  test("when asked for more money than owned, throw an exception", async () => {
    const card = new Card.Builder()
      .setId("cardId")
      .setUserId("userId")
      .setExpires(new Date("2100"))
      .build()
    const account = new Account.Builder()
      .setId("accountId")
      .setBalance(50)
      .build()
    mockedCardRepository.findById.mockResolvedValue(card)
    mockedAccountRepository.findById.mockResolvedValue(account)
    const askedAmount = 51

    const result = (): Promise<WithdrawCashResponse> =>
      sut.execute(new WithdrawCashRequest(account.id, askedAmount))

    expect(result).rejects.toThrowError()
  })

  test("the requested amount of money will be removed from the account when received", async () => {
    const card = new Card.Builder()
      .setId("cardId")
      .setUserId("userId")
      .setExpires(new Date("2100"))
      .build()
    const account = new Account.Builder()
      .setId("accountId")
      .setBalance(50)
      .build()
    const askedAmount = 10
    const expectedAmountLeft = 40
    mockedCardRepository.findById.mockResolvedValue(card)
    mockedAccountRepository.findById.mockResolvedValue(account)

    await sut.execute(new WithdrawCashRequest(card.id, askedAmount))

    expect(account.balance).toBe(expectedAmountLeft)
    expect(mockedAccountRepository.save).toHaveBeenCalledWith(account)
  })
})
