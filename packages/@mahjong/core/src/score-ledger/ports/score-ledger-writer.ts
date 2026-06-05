import type { ScoreTransaction } from '../score-transaction';

export interface IScoreLedgerWriter {
  append(transaction: ScoreTransaction): Promise<void>;
}
