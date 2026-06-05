import type { SeatPosition } from './seat-position';

export interface ITable extends Iterable<SeatPosition> {}

export abstract class Table implements ITable {
  private readonly seats: readonly SeatPosition[];

  public [Symbol.iterator](): Iterator<SeatPosition> {
    return this.seats[Symbol.iterator]();
  }

  protected constructor(...seats: readonly SeatPosition[]) {
    const uniqueSeats = new Set(seats);

    if (seats.length !== uniqueSeats.size) throw new RangeError();

    this.seats = seats;
  }
}
