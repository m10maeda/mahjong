import { BoardEvent } from './board-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';

export enum TileDrawnSource {
  Wall,
  DeadWall,
}

export class TileDrawn extends BoardEvent {
  public readonly drawer: SeatPosition;

  public readonly source: TileDrawnSource;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    drawer: SeatPosition,
    source: TileDrawnSource,
  ) {
    super();

    this.tile = tile;
    this.drawer = drawer;
    this.source = source;
  }
}
