import { ScoreHolder } from './score-holder';
import { SeatPosition } from '../../../seat-position';

export class SeatScoreHolder extends ScoreHolder {
  public static readonly East = new SeatScoreHolder(SeatPosition.East);
  public static readonly North = new SeatScoreHolder(SeatPosition.North);
  public static readonly South = new SeatScoreHolder(SeatPosition.South);
  public static readonly West = new SeatScoreHolder(SeatPosition.West);

  private readonly seat: SeatPosition;

  protected get id(): string {
    return this.seat.toString();
  }

  public [Symbol.toPrimitive](
    hint: 'number' | 'string' | 'default' = 'default',
  ): number | string {
    if (hint === 'string') return this.toString();

    return this.valueOf();
  }

  public toString(): string {
    return this.seat.toString();
  }

  public valueOf(): number {
    return this.seat.valueOf();
  }

  private constructor(seat: SeatPosition) {
    super();

    this.seat = seat;
  }

  public static of(seat: SeatPosition): SeatScoreHolder {
    return new SeatScoreHolder(seat);
  }
}
