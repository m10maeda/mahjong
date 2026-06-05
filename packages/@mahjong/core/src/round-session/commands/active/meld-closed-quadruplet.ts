import { RoundSessionCommand } from '../round-session-command';
import { ActiveRoundSessionCommand } from './active-round-session-command';

import type { SeatPosition, Tile } from '../../../concepts';

export class MeldClosedQuadruplet extends ActiveRoundSessionCommand {
  public readonly consumedTiles: readonly [Tile, Tile, Tile, Tile];

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    consumedTiles: readonly [Tile, Tile, Tile, Tile],
  ) {
    super();

    this.seat = seat;
    this.consumedTiles = consumedTiles;
  }

  public static isMeldClosedQuadruplet(
    command: RoundSessionCommand,
  ): command is MeldClosedQuadruplet {
    return command instanceof MeldClosedQuadruplet;
  }
}
