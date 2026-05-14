import { ScoreTransacted } from '../events';

import type { ScoreTransaction } from '../concepts';

export class ScoreLedger implements Iterable<ScoreTransaction> {
  private readonly transactions: readonly ScoreTransaction[];

  public add(
    transaction: ScoreTransaction,
  ): readonly [ScoreLedger, ScoreTransacted] {
    return [
      new ScoreLedger(...this.transactions, transaction),
      new ScoreTransacted([...transaction], transaction.round),
    ];
  }

  public [Symbol.iterator](): Iterator<ScoreTransaction> {
    return this.transactions[Symbol.iterator]();
  }

  public constructor(...transactions: readonly ScoreTransaction[]) {
    this.transactions = transactions;
  }
}
