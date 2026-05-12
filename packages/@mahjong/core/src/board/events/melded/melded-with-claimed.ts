import { Melded } from './melded';

import type { MeldReference } from './meld-reference';
import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';

export class MeldedWithClaimed extends Melded {
  public readonly claimedOn: SeatPosition;

  public readonly claimedTile: Tile;

  public constructor(
    reference: MeldReference,
    seat: SeatPosition,
    consumedTiles: readonly Tile[],
    claimedOn: SeatPosition,
    claimedTile: Tile,
  ) {
    super(reference, seat, consumedTiles);

    this.claimedOn = claimedOn;
    this.claimedTile = claimedTile;
  }
}
