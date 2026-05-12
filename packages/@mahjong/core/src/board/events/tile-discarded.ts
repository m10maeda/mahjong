import { BoardEvent } from './board-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';

export class TileDiscarded extends BoardEvent {
  public readonly discarder: SeatPosition;

  public readonly fromDrawnTile: boolean;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    fromDrawnTile: boolean,
    discarder: SeatPosition,
  ) {
    super();

    this.tile = tile;
    this.fromDrawnTile = fromDrawnTile;
    this.discarder = discarder;
  }
}
