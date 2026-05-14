import { FourPlayersTable } from './four-players-table';
import { ThreePlayersTable } from './three-players-table';

import type { SeatPosition } from './seat-position';
import type { ITable, Table } from './table';

export class TableType implements ITable {
  public static readonly FourPlayers = new TableType(new FourPlayersTable());

  public static readonly ThreePlayers = new TableType(new ThreePlayersTable());

  private readonly type: Table;

  public [Symbol.iterator](): Iterator<SeatPosition> {
    return this.type[Symbol.iterator]();
  }

  private constructor(type: Table) {
    this.type = type;
  }
}
