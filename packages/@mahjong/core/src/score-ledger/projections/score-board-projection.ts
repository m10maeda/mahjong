import { SeatPosition, type ITable } from '../../table';
import { Point, ScoreHolder } from '../concepts';
import { ScoreTransacted, type ScoreLedgerEvent } from '../events';

export class ScoreBoardProjection implements Iterable<
  readonly [ScoreHolder, Point]
> {
  private readonly scores: Map<ScoreHolder, Point>;

  public apply(event: ScoreLedgerEvent): ScoreBoardProjection {
    if (!(event instanceof ScoreTransacted)) return this;

    const newScores = new Map(
      [...this.scores.entries()].map<readonly [ScoreHolder, Point]>(
        ([holder, balance]) => {
          const delta = event.entries.find((entry) => entry.target === holder);

          if (delta === undefined) return [holder, balance];

          return [holder, balance.add(delta.amount)];
        },
      ),
    );

    return new ScoreBoardProjection(newScores);
  }

  public getBalanceBy(holder: ScoreHolder): Point | undefined {
    return this.scores.get(holder);
  }

  public [Symbol.iterator](): Iterator<readonly [ScoreHolder, Point]> {
    return this.scores.entries();
  }

  public constructor(scores: Map<ScoreHolder, Point>) {
    this.scores = scores;
  }

  public static new(startingPoint: Point, table: ITable): ScoreBoardProjection {
    const seats = [...table];

    const holders = seats.map((seat) => {
      if (seat.equals(SeatPosition.East)) return ScoreHolder.EastSeat;
      if (seat.equals(SeatPosition.South)) return ScoreHolder.SouthSeat;
      if (seat.equals(SeatPosition.West)) return ScoreHolder.WestSeat;
      if (seat.equals(SeatPosition.North)) return ScoreHolder.NorthSeat;

      throw new RangeError();
    });

    const scores = new Map<ScoreHolder, Point>([
      ...holders.map<readonly [ScoreHolder, Point]>((holder) => [
        holder,
        startingPoint,
      ]),
      [ScoreHolder.Pot, Point.Zero],
    ]);

    return new ScoreBoardProjection(scores);
  }
}
