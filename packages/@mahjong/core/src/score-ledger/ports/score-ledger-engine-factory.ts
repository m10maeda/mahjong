import type { IScoreLedgerEngine } from './score-ledger-engine';

export interface IScoreLedgerEngineFactory {
  create(): IScoreLedgerEngine;
}
