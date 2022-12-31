import { NextFunction, Request, Response } from "express"

export interface IMiddleware {
  handle(req: Request, res: Response, next: NextFunction): Promise<void>
}
