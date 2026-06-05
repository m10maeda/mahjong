import { ActiveRoundSessionCommand } from './active-round-session-command';

import type { SeatPosition, Tile } from '../../../concepts';
import type { RoundSessionCommand } from '../round-session-command';

export abstract class DiscardTile extends ActiveRoundSessionCommand {
  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public constructor(seat: SeatPosition, tile: Tile) {
    super();

    this.seat = seat;
    this.tile = tile;
  }

  public static isDiscardTileWithRiichi(
    command: RoundSessionCommand,
  ): command is DiscardTile {
    return command instanceof DiscardTile;
  }
}
