import type { IScoreLedgerWriter } from '../ports';
import type { ScoreLedger } from '../score-ledger';
import type { ScoreTransaction } from '../score-transaction';
import type { IScoreLedgerEventPublisher } from './score-ledger-event-publisher';

export class ScoreLedgerEngine implements IScoreLedgerWriter {
  private readonly eventPublisher: IScoreLedgerEventPublisher;

  private scoreLedger: ScoreLedger;

  public async append(transaction: ScoreTransaction): Promise<void> {
    const [newScoreLedger, event] = this.scoreLedger.append(transaction);

    this.scoreLedger = newScoreLedger;

    await this.eventPublisher.publish(event);
  }

  public constructor(
    scoreLedger: ScoreLedger,
    eventPublisher: IScoreLedgerEventPublisher,
  ) {
    this.scoreLedger = scoreLedger;
    this.eventPublisher = eventPublisher;
  }
}
