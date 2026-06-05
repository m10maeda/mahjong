import { RoundSessionEvent } from '../round-session-event';

import type { Round } from '../../../round';
import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';

export class TileDrawnFromLiveWall extends RoundSessionEvent {
  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public constructor(tile: Tile, seat: SeatPosition, round: Round) {
    super(round);

    this.tile = tile;
    this.seat = seat;
  }
}
