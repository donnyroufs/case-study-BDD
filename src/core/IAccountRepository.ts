import { Account } from "./core/Account"

export interface IAccountRepository {
  findById(id: string): Promise<Account>
  save(account: Account): Promise<void>
}
