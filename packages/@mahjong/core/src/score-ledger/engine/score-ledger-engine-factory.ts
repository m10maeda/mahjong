import { ScoreLedgerEngine } from './score-ledger-engine';
import { ScoreLedger } from '../models';

import type { IScoreLedgerEventPublisher } from '../events';
import type { IScoreLedgerEngine, IScoreLedgerEngineFactory } from '../ports';

export class ScoreLedgerEngineFactory implements IScoreLedgerEngineFactory {
  public create(
    eventPublisher: IScoreLedgerEventPublisher,
  ): IScoreLedgerEngine {
    return new ScoreLedgerEngine(new ScoreLedger(), eventPublisher);
  }
}
