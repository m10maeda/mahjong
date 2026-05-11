import {
  PotScoreHolder,
  ScoreHolder,
  ScoreTransacted,
  SeatScoreHolder,
  type ScoreLedgerEvent,
} from '..';
import { Point } from '../../point';

import type { SeatPosition } from '../../../seat-position';

export class ScoreBoardProjection implements Iterable<
  readonly [ScoreHolder, Point]
> {
  private readonly scores: Map<ScoreHolder, Point>;

  public apply(event: ScoreLedgerEvent): ScoreBoardProjection {
    if (!(event instanceof ScoreTransacted)) return this;

    const newScores = new Map(
      [...this.scores.entries()].map<readonly [ScoreHolder, Point]>(
        ([holder, balance]) => {
          const delta = event.entries.find((entry) =>
            entry.target.equals(holder),
          );

          if (delta === undefined) return [holder, balance];

          return [holder, balance.add(delta.amount)];
        },
      ),
    );

    return new ScoreBoardProjection(newScores);
  }

  public [Symbol.iterator](): Iterator<readonly [ScoreHolder, Point]> {
    return this.scores.entries();
  }

  public constructor(scores: Map<ScoreHolder, Point>) {
    this.scores = scores;
  }

  public static of(
    startingPoint: Point,
    seats: readonly SeatPosition[],
  ): ScoreBoardProjection {
    const uniqueSeats = new Set([...seats]);

    if (seats.length !== uniqueSeats.size) throw new Error();

    const scores = new Map<ScoreHolder, Point>([
      ...seats.map<readonly [SeatScoreHolder, Point]>((seat) => [
        SeatScoreHolder.of(seat),
        startingPoint,
      ]),
      [PotScoreHolder.new(), Point.Zero],
    ]);

    return new ScoreBoardProjection(scores);
  }
}
