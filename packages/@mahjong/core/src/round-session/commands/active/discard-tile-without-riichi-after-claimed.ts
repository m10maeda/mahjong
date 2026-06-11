import { RoundSessionCommand } from '../round-session-command';
import { DiscardTile } from './discard-tile';

import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';
import type { ClaimedMeld } from '../../melds';

export class DiscardTileWithoutRiichiAfterClaimed extends DiscardTile {
  public readonly claimedMeld: ClaimedMeld;

  public constructor(seat: SeatPosition, tile: Tile, claimedMeld: ClaimedMeld) {
    super(seat, tile);

    if (
      claimedMeld.prohibitedDiscardTiles.some((_tile) =>
        _tile.equals(tile.type),
      )
    )
      throw new TypeError('Can not discard prohibited tiles.');

    this.claimedMeld = claimedMeld;
  }

  public static DiscardTileWithoutRiichiAfterClaimed(
    command: RoundSessionCommand,
  ): command is DiscardTileWithoutRiichiAfterClaimed {
    return command instanceof DiscardTileWithoutRiichiAfterClaimed;
  }
}
