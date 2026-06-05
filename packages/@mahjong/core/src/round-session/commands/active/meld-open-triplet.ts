import { RoundSessionCommand } from '../round-session-command';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';

export class MeldOpenTriplet extends RoundSessionCommand {
  public readonly claimedOn: SeatPosition;

  public readonly claimedTile: Tile;

  public readonly consumedTiles: readonly [Tile, Tile];

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    claimedTile: Tile,
    claimedOn: SeatPosition,
    consumedTiles: readonly [Tile, Tile],
  ) {
    super();

    this.seat = seat;
    this.claimedTile = claimedTile;
    this.claimedOn = claimedOn;
    this.consumedTiles = consumedTiles;
  }

  public static isMeldOpenTriplet(
    command: RoundSessionCommand,
  ): command is MeldOpenTriplet {
    return command instanceof MeldOpenTriplet;
  }
}
