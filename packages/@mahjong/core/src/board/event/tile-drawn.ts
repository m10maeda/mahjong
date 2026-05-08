import { TurnBasedEvent } from './turn-based-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { Turn } from '../turn';

export enum TileDrawnSource {
  Wall,
  DeadWall,
}

export class TileDrawn extends TurnBasedEvent {
  public readonly actor: SeatPosition;

  public readonly source: TileDrawnSource;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    seat: SeatPosition,
    source: TileDrawnSource,
    turn: Turn,
  ) {
    super(turn);

    this.tile = tile;
    this.actor = seat;
    this.source = source;
  }
}
