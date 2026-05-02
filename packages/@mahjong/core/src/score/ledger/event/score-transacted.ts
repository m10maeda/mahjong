import { ScoreEntry } from './score-entry';

import type { Round } from '../../../round';

export enum TransactionReason {
  InitialDistribution,
  Transfer,
  Settlement,
}

export class ScoreTransacted implements Iterable<ScoreEntry> {
  public readonly reason: TransactionReason;

  public readonly round: Round;

  private readonly entries: readonly ScoreEntry[];

  public [Symbol.iterator](): Iterator<ScoreEntry> {
    return this.entries[Symbol.iterator]();
  }

  public constructor(
    entries: readonly [ScoreEntry, ScoreEntry, ...ScoreEntry[]],
    round: Round,
    reason: TransactionReason,
  ) {
    this.entries = entries;
    this.round = round;
    this.reason = reason;
  }
}
