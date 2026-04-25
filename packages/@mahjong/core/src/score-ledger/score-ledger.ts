import type { AccountingTransaction } from './accounting-transaction';

export class ScoreLedger implements Iterable<AccountingTransaction> {
  private readonly transactions: readonly AccountingTransaction[];

  public record(transaction: AccountingTransaction): ScoreLedger {
    return new ScoreLedger([...this.transactions, transaction]);
  }

  public [Symbol.iterator](): Iterator<AccountingTransaction> {
    return this.transactions[Symbol.iterator]();
  }

  public constructor(transactions: AccountingTransaction[]) {
    this.transactions = transactions;
  }
}
