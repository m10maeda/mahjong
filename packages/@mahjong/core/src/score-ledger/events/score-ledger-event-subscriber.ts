import type { ScoreLedgerEvent } from './score-ledger-event';

export interface IScoreLedgerEventSubscriber {
  handle(event: ScoreLedgerEvent): Promise<void>;
}
