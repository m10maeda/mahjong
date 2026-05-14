import type { IScoreLedgerEventPublisher } from '../events';
import type { ScoreLedger, ScoreTransaction } from '../models';
import type { IScoreBoardReader, IScoreLedgerWriter } from '../ports';
import type { ScoreBoardProjection } from '../projections';

export class ScoreLedgerRuntime
  implements IScoreLedgerWriter, IScoreBoardReader
{
  private readonly eventPublisher: IScoreLedgerEventPublisher;

  private projection: ScoreBoardProjection;

  private scoreLedger: ScoreLedger;

  public async add(transaction: ScoreTransaction): Promise<void> {
    const [newScoreLedger, event] = this.scoreLedger.add(transaction);

    this.scoreLedger = newScoreLedger;
    this.projection = this.projection.apply(event);

    await this.eventPublisher.publish(event);
  }

  public getScoreBoard(): ScoreBoardProjection {
    return this.projection;
  }

  public constructor(
    scoreLedger: ScoreLedger,
    projection: ScoreBoardProjection,
    eventPublisher: IScoreLedgerEventPublisher,
  ) {
    this.scoreLedger = scoreLedger;
    this.projection = projection;
    this.eventPublisher = eventPublisher;
  }
}
