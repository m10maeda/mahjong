import type { ScoreTransaction } from '../concepts';

export interface IScoreLedgerWriter {
  add(transaction: ScoreTransaction): Promise<void>;
}
