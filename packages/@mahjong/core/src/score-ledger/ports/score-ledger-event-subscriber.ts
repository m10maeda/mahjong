import type { ScoreLedgerEvent } from '../events';

export interface IScoreLedgerEventSubscriber {
  handle(event: ScoreLedgerEvent): Promise<void>;
}
