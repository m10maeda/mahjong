import { Melded } from './melded';

import type { SeatPosition, Tile } from '../../../concepts';
import type { MeldReference } from '../../concepts';

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
