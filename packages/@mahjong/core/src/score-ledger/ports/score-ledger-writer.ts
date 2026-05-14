import type { ScoreTransaction } from '../models';

export interface IScoreLedgerWriter {
  add(transaction: ScoreTransaction): Promise<void>;
}
