import { BoardCommand } from './board-command';

import type { SeatPosition, Tile } from '../../concepts';

export class MeldFromSelf extends BoardCommand {
  public readonly consumedTiles: readonly Tile[];

  public readonly seat: SeatPosition;

  public constructor(seat: SeatPosition, consumedTiles: readonly Tile[]) {
    super();

    this.seat = seat;
    this.consumedTiles = consumedTiles;
  }
}
