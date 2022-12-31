import { IDateService } from "../../core"

export class DateServiceImpl implements IDateService {
  public getTodaysDate = (): Date => new Date()
}
