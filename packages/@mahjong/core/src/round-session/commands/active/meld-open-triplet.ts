import { RoundSessionCommand } from '../round-session-command';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';
import type { Pair } from '../../../winning-hand-shape';

export class MeldOpenTriplet extends RoundSessionCommand {
  public readonly claimedOn: SeatPosition;

  public readonly claimedTile: Tile;

  public readonly pair: Pair;

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    claimedTile: Tile,
    claimedOn: SeatPosition,
    pair: Pair,
  ) {
    super();

    this.seat = seat;
    this.claimedTile = claimedTile;
    this.claimedOn = claimedOn;
    this.pair = pair;
  }

  public static isMeldOpenTriplet(
    command: RoundSessionCommand,
  ): command is MeldOpenTriplet {
    return command instanceof MeldOpenTriplet;
  }
}
