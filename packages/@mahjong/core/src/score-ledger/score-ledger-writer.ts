import type { ScoreTransaction } from './score-transaction';

export interface IScoreLedgerWriter {
  add(transaction: ScoreTransaction): Promise<void>;
}
