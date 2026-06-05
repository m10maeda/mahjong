import { RoundSessionEvent } from '../round-session-event';

import type { Round, SeatPosition, Tile } from '../../../concepts';

export class TileDrawnFromDeadWall extends RoundSessionEvent {
  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public constructor(tile: Tile, seat: SeatPosition, round: Round) {
    super(round);

    this.tile = tile;
    this.seat = seat;
  }
}
