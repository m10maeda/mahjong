import { BoardCommand } from './board-command';

import type { SeatPosition, Tile } from '../../concepts';

export class MeldWithClaimed extends BoardCommand {
  public readonly claimedOn: SeatPosition;

  public readonly claimedTile: Tile;

  public readonly consumedTiles: readonly Tile[];

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    claimedTile: Tile,
    claimedOn: SeatPosition,
    consumedTiles: readonly Tile[],
  ) {
    super();

    this.seat = seat;
    this.claimedTile = claimedTile;
    this.claimedOn = claimedOn;
    this.consumedTiles = consumedTiles;
  }
}
