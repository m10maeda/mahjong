import { RoundSessionCommand } from '../round-session-command';

import type { SeatPosition, Tile } from '../../../concepts';

export class MeldOpenSequence extends RoundSessionCommand {
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

  public static isMeldOpenSequence(
    command: RoundSessionCommand,
  ): command is MeldOpenSequence {
    return command instanceof MeldOpenSequence;
  }
}
