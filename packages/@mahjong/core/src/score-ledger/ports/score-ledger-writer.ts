import type { ScoreTransaction } from '../concepts';

export interface IScoreLedgerWriter {
  append(transaction: ScoreTransaction): Promise<void>;
}
