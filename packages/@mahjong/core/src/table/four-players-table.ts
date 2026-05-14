import { SeatPosition } from './seat-position';
import { Table } from './table';

export class FourPlayersTable extends Table {
  public constructor() {
    super(
      SeatPosition.East,
      SeatPosition.South,
      SeatPosition.West,
      SeatPosition.North,
    );
  }
}
