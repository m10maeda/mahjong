import { SeatPosition } from './seat-position';
import { Table } from './table';

export class ThreePlayersTable extends Table {
  public constructor() {
    super(SeatPosition.East, SeatPosition.South, SeatPosition.West);
  }
}
