import { TurnBasedEvent } from './turn-based-event';

import type { Round } from '../../round';
import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { Turn } from '../turn';

export enum TileDrawnSource {
  Wall,
  DeadWall,
}

type WallIndex = number;

export class TileDrawn extends TurnBasedEvent {
  public readonly deadWallStartPosition: WallIndex;

  public readonly seat: SeatPosition;

  public readonly source: TileDrawnSource;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    seat: SeatPosition,
    source: TileDrawnSource,
    turn: Turn,
    round: Round,
    deadWallStartPosition: WallIndex,
  ) {
    super(turn, round);

    this.tile = tile;
    this.seat = seat;
    this.source = source;
    this.deadWallStartPosition = deadWallStartPosition;
  }
}
