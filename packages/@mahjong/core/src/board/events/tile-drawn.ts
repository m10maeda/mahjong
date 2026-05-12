import { BoardEvent } from './board-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';

export enum TileDrawnSource {
  Wall,
  DeadWall,
}

export class TileDrawn extends BoardEvent {
  public readonly seat: SeatPosition;

  public readonly source: TileDrawnSource;

  public readonly tile: Tile;

  public constructor(tile: Tile, seat: SeatPosition, source: TileDrawnSource) {
    super();

    this.tile = tile;
    this.seat = seat;
    this.source = source;
  }
}
