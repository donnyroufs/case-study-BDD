import { Request, Response } from "express"
import { WithdrawCashUseCase } from "../../../core"

export class WithdrawCashController {
  public constructor(private readonly _useCase: WithdrawCashUseCase) {}

  public async handle(req: Request, res: Response): Promise<void> {
    try {
      const result = await this._useCase.execute(req.body)
      res.json(result)
    } catch (err) {
      res.json({
        message: (err as Error).message,
      })
    }
  }
}
