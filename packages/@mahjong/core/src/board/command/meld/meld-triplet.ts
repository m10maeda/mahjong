import { BoardCommand } from '../board-command';

import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';
import type { Turn } from '../../turn';

export class MeldTriplet extends BoardCommand {
  public readonly claimedOn: SeatPosition;

  public readonly claimedTile: Tile;

  public readonly consumedTiles: readonly [Tile, ...Tile[]];

  public readonly currentTurn: Turn;

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    claimedTile: Tile,
    claimedOn: SeatPosition,
    consumed: readonly [Tile, ...Tile[]],
    currentTurn: Turn,
  ) {
    super();

    this.seat = seat;
    this.claimedTile = claimedTile;
    this.claimedOn = claimedOn;
    this.consumedTiles = consumed;
    this.currentTurn = currentTurn;
  }
}
