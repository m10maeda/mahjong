import { TurnBasedEvent } from './turn-based-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { Turn } from '../turn';

export enum TileDrawnSource {
  Wall,
  DeadWall,
}

export class TileDrawn extends TurnBasedEvent {
  public readonly drawer: SeatPosition;

  public readonly source: TileDrawnSource;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    drawer: SeatPosition,
    source: TileDrawnSource,
    turn: Turn,
  ) {
    super(turn);

    this.tile = tile;
    this.drawer = drawer;
    this.source = source;
  }
}
