import { Around } from './around';

import type { ITable, SeatPosition } from '../../table';

export class Turn {
  public readonly activeSeat: SeatPosition;

  public readonly around: Around;

  private readonly table: ITable;

  public isFirstAround(): boolean {
    return this.around.isFirst();
  }

  public next(): Turn {
    const lastSeat = [...this.table][[...this.table].length - 1];
    const [firstSeat] = [...this.table];
    const index = [...this.table].findIndex((seat) =>
      seat.equals(this.activeSeat),
    );

    const nextSeat = [...this.table][index];

    if (
      lastSeat === undefined ||
      firstSeat === undefined ||
      nextSeat === undefined
    )
      throw new Error();

    if (this.activeSeat.equals(lastSeat))
      return new Turn(this.around.advance(), firstSeat, this.table);

    return new Turn(this.around, nextSeat, this.table);
  }

  public of(seat: SeatPosition): boolean {
    return seat.equals(this.activeSeat);
  }

  public skipTo(seat: SeatPosition): Turn {
    return new Turn(this.around.advance(), seat, this.table);
  }

  public constructor(around: Around, activeSeat: SeatPosition, table: ITable) {
    if (![...table].some((seat) => seat.equals(activeSeat)))
      throw new RangeError();

    this.around = around;
    this.activeSeat = activeSeat;
    this.table = table;
  }
}
