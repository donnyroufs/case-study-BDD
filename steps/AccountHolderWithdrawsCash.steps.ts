import { defineFeature, loadFeature } from "jest-cucumber"
import {
  CompositionRootBuilder,
  ICompositionRoot,
} from "../src/CompositionRootBuilder"
import { Account, Card, WithdrawCashRequest } from "../src/core"
import { WebApi } from "../src/adapters/web-api"
import { ATMMachine } from "../src/core/ATMMachine"
import supertest from "supertest"

const feature = loadFeature("features/AccountHolderWithdrawsCash.feature")

defineFeature(feature, (test) => {
  test("Account has sufficient funds", ({
    given,
    and,
    when,
    then,
    pending,
  }) => {
    let webApi: WebApi
    let response: any
    let deps: ICompositionRoot
    const compositionRootBuilder = new CompositionRootBuilder()
    const accountId = "donny"
    const cardId = "donnys-card"

    afterAll(async () => {
      await webApi.dispose()
    })

    given(/^The account balance is \$(\d+)$/, async (balance: number) => {
      const account = new Account.Builder()
        .setId(accountId)
        .setBalance(balance)
        .build()

      compositionRootBuilder.addAccount(account)
    })

    and("the card is valid", async () => {
      const card = new Card.Builder()
        .setId(cardId)
        .setExpires(new Date("2100"))
        .setUserId(accountId)
        .build()

      deps = await compositionRootBuilder.addCard(card).build()
      webApi = new WebApi(deps.withdrawCashUseCase)
      await webApi.start()
    })

    and("the machine contains enough money", () => {
      ATMMachine.getInstance().setCash(100_000)
    })

    when(/^the Account Holder requests \$(\d+)$/, async (amount: number) => {
      const request = new WithdrawCashRequest(cardId, amount)

      response = await supertest(webApi.getHttpServer().unwrap())
        .post("/withdraw")
        .send(request)
    })

    then(/^the ATM should dispense \$(\d+)$/, (cash) => {
      expect(response.body.cash).toBe(cash)
    })

    and(/^the account balance should be \$(\d+)$/, async (amount) => {
      expect(response.body.newBalance).toBe(Number(amount))
    })
  })
})
