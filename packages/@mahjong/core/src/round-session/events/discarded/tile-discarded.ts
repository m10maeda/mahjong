import { RoundSessionEvent } from '../round-session-event';

import type { Round, SeatPosition, Tile } from '../../../concepts';

export abstract class TileDiscarded extends RoundSessionEvent {
  public readonly fromDrawnTile: boolean;

  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    seat: SeatPosition,
    fromDrawnTile: boolean,
    round: Round,
  ) {
    super(round);

    this.tile = tile;
    this.fromDrawnTile = fromDrawnTile;
    this.seat = seat;
  }
}
