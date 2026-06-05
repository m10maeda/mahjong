import type { ScoreLedgerEvent } from '../events';

export interface IScoreLedgerEventPublisher {
  publish(event: ScoreLedgerEvent): Promise<void>;
}
