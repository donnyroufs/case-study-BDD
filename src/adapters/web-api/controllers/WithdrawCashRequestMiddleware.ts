import { NextFunction, Request, Response } from "express"
import { IMiddleware } from "../IMiddleware"

export class WithdrawCashRequestMiddleware implements IMiddleware {
  public async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { cardId, amount } = req.body

    if (!cardId || !amount) {
      res.sendStatus(400)
      return
    }

    return next()
  }
}
