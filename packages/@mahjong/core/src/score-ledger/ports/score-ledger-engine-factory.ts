import type { IScoreLedgerEventPublisher } from '../events';
import type { IScoreLedgerEngine } from './score-ledger-engine';

export interface IScoreLedgerEngineFactory {
  create(eventPublisher: IScoreLedgerEventPublisher): IScoreLedgerEngine;
}
