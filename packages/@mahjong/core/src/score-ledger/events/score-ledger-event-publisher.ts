import type { ScoreLedgerEvent } from './score-ledger-event';

export interface IScoreLedgerEventPublisher {
  publish(event: ScoreLedgerEvent): Promise<void>;
}
