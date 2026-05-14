import type { Point, ScoreHolder } from '../concepts';

export class Score {
  public readonly balance: Point;

  public readonly holder: ScoreHolder;

  public constructor(holder: ScoreHolder, balance: Point) {
    this.holder = holder;
    this.balance = balance;
  }
}
