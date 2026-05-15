import { BoardCommand } from './board-command';

import type { SeatPosition, Tile } from '../../concepts';

export class DiscardTile extends BoardCommand {
  public readonly fromDrawnTile: boolean;

  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public constructor(seat: SeatPosition, tile: Tile, fromDrawnTile: boolean) {
    super();

    this.seat = seat;
    this.tile = tile;
    this.fromDrawnTile = fromDrawnTile;
  }
}
