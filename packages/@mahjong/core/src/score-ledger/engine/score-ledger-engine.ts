import type { ScoreTransaction } from '../concepts';
import type { IScoreLedgerEventPublisher } from '../events';
import type { ScoreLedger } from '../models';
import type { IScoreLedgerWriter } from '../ports';

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
