import { BoardEvent } from './board-event';

import type { SeatPosition } from '../../table';
import type { Tile } from '../../tile';

export class TileDiscarded extends BoardEvent {
  public readonly fromDrawnTile: boolean;

  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public constructor(tile: Tile, seat: SeatPosition, fromDrawnTile: boolean) {
    super();

    this.tile = tile;
    this.fromDrawnTile = fromDrawnTile;
    this.seat = seat;
  }
}
