import { RoundSessionCommand } from '../round-session-command';
import { DiscardTile } from './discard-tile';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';

export class DiscardTileWithRiichi extends DiscardTile {
  public readonly fromDrawnTile: boolean;

  public constructor(seat: SeatPosition, tile: Tile, fromDrawnTile: boolean) {
    super(seat, tile);

    this.fromDrawnTile = fromDrawnTile;
  }

  public static isDiscardTileWithRiichi(
    command: RoundSessionCommand,
  ): command is DiscardTileWithRiichi {
    return command instanceof DiscardTileWithRiichi;
  }
}
