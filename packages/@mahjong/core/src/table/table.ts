import { SeatPosition } from './seat-position';

export interface ITable extends Iterable<SeatPosition> {}

export class Table implements ITable {
  public static readonly FourPlayersTable = new Table(
    SeatPosition.East,
    SeatPosition.South,
    SeatPosition.West,
    SeatPosition.North,
  );
  public static readonly ThreePlayersTable = new Table(
    SeatPosition.East,
    SeatPosition.South,
    SeatPosition.West,
  );
  public static readonly TwoPlayersTable = new Table(
    SeatPosition.East,
    SeatPosition.South,
    SeatPosition.West,
  );

  private readonly seats: readonly SeatPosition[];

  public [Symbol.iterator](): Iterator<SeatPosition> {
    return this.seats[Symbol.iterator]();
  }

  private constructor(...seats: readonly SeatPosition[]) {
    this.seats = seats;
  }
}
