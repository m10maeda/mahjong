import { Score } from '../ports';

import type { ScoreHolder, ScoreTransaction } from '../concepts';
import type { IScoreLedgerEventPublisher } from '../events';
import type { ScoreLedger } from '../models';
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

  public getAllScores(): readonly Score[] {
    return [...this.projection].map(
      ([holder, balance]) => new Score(holder, balance),
    );
  }

  public getScoreBy(holder: ScoreHolder): Score | undefined {
    const balance = this.projection.getBalanceBy(holder);

    if (balance === undefined) return undefined;

    return new Score(holder, balance);
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
