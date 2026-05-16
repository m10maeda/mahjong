import type { Point } from './point';
import type { ScoreHolder } from './score-holder';

export class ScoreEntry {
  public readonly amount: Point;

  public readonly target: ScoreHolder;

  public constructor(target: ScoreHolder, amount: Point) {
    if (amount.isZero()) throw new RangeError();

    this.target = target;
    this.amount = amount;
  }
}
