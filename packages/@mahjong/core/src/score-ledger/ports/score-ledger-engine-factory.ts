import type { IScoreLedgerEventPublisher } from '../engine';
import type { IScoreLedgerEngine } from './score-ledger-engine';

export interface IScoreLedgerEngineFactory {
  create(eventPublisher: IScoreLedgerEventPublisher): IScoreLedgerEngine;
}
