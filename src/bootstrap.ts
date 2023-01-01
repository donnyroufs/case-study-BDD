import { WebApi } from "./adapters/web-api"
import { Account, Card } from "./core"
import { CompositionRootBuilder } from "./CompositionRootBuilder"

export async function bootstrap(): Promise<void> {
  const account = new Account.Builder().setId("donny").setBalance(100).build()
  const card = new Card.Builder()
    .setId("donnys-card")
    .setExpires(new Date("2100"))
    .setUserId(account.id)
    .build()

  const root = await new CompositionRootBuilder()
    .addAccount(account)
    .addCard(card)
    .build()

  const api = new WebApi(root.withdrawCashUseCase)

  await api.start()
}

bootstrap()
