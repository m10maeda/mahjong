import { RoundSessionCommand } from '../round-session-command';
import { DiscardTile } from './discard-tile';

import type { SeatPosition, Tile } from '../../../concepts';

export class DiscardTileWithoutRiichiAfterDrawn extends DiscardTile {
  public readonly fromDrawnTile: boolean;

  public constructor(seat: SeatPosition, tile: Tile, fromDrawnTile: boolean) {
    super(seat, tile);

    this.fromDrawnTile = fromDrawnTile;
  }

  public static isDiscardTileWithoutRiichiAfterDrawn(
    command: RoundSessionCommand,
  ): command is DiscardTileWithoutRiichiAfterDrawn {
    return command instanceof DiscardTileWithoutRiichiAfterDrawn;
  }
}
