import { RoundSessionCommand } from '../round-session-command';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';
import type { SerialPair } from '../../../winning-hand-shape';

export class MeldOpenSequence extends RoundSessionCommand {
  public readonly claimedOn: SeatPosition;

  public readonly claimedTile: Tile;

  public readonly seat: SeatPosition;

  public readonly serialPair: SerialPair;

  public constructor(
    seat: SeatPosition,
    claimedTile: Tile,
    claimedOn: SeatPosition,
    serialPair: SerialPair,
  ) {
    super();

    this.seat = seat;
    this.claimedTile = claimedTile;
    this.claimedOn = claimedOn;
    this.serialPair = serialPair;
  }

  public static isMeldOpenSequence(
    command: RoundSessionCommand,
  ): command is MeldOpenSequence {
    return command instanceof MeldOpenSequence;
  }
}
