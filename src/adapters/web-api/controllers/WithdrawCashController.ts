import { Request, Response } from "express"
import { WithdrawCashUseCase } from "../../../core"

export class WithdrawCashController {
  public constructor(private readonly _useCase: WithdrawCashUseCase) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute(req.body)

    res.json(result)
  }
}
