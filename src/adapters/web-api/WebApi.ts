import { WithdrawCashUseCase } from "../../core"
import { WithdrawCashController } from "./controllers/WithdrawCashController"
import { Server } from "./Server"
import { WithdrawCashRequestMiddleware } from "./controllers/WithdrawCashRequestMiddleware"

export class WebApi extends Server {
  public constructor(
    private readonly _withdrawCashUseCase: WithdrawCashUseCase
  ) {
    super()
  }

  public async setup(): Promise<void> {
    const controller = new WithdrawCashController(this._withdrawCashUseCase)
    const guard = new WithdrawCashRequestMiddleware()

    this.app.post(
      "/withdraw",
      guard.handle.bind(guard),
      controller.handle.bind(controller)
    )
  }
}
