import { Account, IAccountRepository } from "../../core"

export class InMemoryAccountRepositoryImpl implements IAccountRepository {
  private readonly _collection: Map<string, Account> = new Map()

  public constructor(accounts: Account[] = []) {
    accounts.forEach((account) => this._collection.set(account.id, account))
  }

  public async findById(id: string): Promise<Account> {
    return this._collection.get(id)!
  }

  public async save(account: Account): Promise<void> {
    this._collection.set(account.id, account)
  }
}
