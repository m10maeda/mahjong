import { ScoreEntry } from '../concepts';
import { ScoreLedgerEvent } from './score-ledger-event';

import type { Round } from '../../round';

export class ScoreTransacted extends ScoreLedgerEvent {
  public readonly entries: readonly ScoreEntry[];

  public readonly round: Round;

  public [Symbol.iterator](): Iterator<ScoreEntry> {
    return this.entries[Symbol.iterator]();
  }

  public constructor(entries: readonly ScoreEntry[], round: Round) {
    super();

    this.entries = entries;
    this.round = round;
  }
}
