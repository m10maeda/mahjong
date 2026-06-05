import { ScoreTransactionAppended } from './events';

import type { ScoreTransaction } from './score-transaction';

export class ScoreLedger implements Iterable<ScoreTransaction> {
  private readonly transactions: readonly ScoreTransaction[];

  public append(
    transaction: ScoreTransaction,
  ): readonly [ScoreLedger, ScoreTransactionAppended] {
    return [
      new ScoreLedger(...this.transactions, transaction),
      new ScoreTransactionAppended([...transaction], transaction.round),
    ];
  }

  public [Symbol.iterator](): Iterator<ScoreTransaction> {
    return this.transactions[Symbol.iterator]();
  }

  public constructor(...transactions: readonly ScoreTransaction[]) {
    this.transactions = transactions;
  }
}
