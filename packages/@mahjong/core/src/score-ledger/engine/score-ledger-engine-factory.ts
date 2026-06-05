import { ScoreLedgerEngine } from './score-ledger-engine';
import { ScoreLedger } from '../score-ledger';

import type { IScoreLedgerEngine, IScoreLedgerEngineFactory } from '../ports';
import type { IScoreLedgerEventPublisher } from './score-ledger-event-publisher';

export class ScoreLedgerEngineFactory implements IScoreLedgerEngineFactory {
  public create(
    eventPublisher: IScoreLedgerEventPublisher,
  ): IScoreLedgerEngine {
    return new ScoreLedgerEngine(new ScoreLedger(), eventPublisher);
  }
}
