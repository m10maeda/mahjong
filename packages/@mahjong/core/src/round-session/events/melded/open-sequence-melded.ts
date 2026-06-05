import { Melded } from './melded';

import type { Round, SeatPosition, Tile } from '../../../concepts';
import type { MeldReference } from '../../meld-reference';

export class OpenSequenceMelded extends Melded {
  public readonly claimedOn: SeatPosition;

  public readonly claimedTile: Tile;

  public constructor(
    reference: MeldReference,
    consumedTiles: readonly Tile[],
    claimedOn: SeatPosition,
    claimedTile: Tile,
    seat: SeatPosition,
    round: Round,
  ) {
    super(reference, consumedTiles, seat, round);

    this.claimedOn = claimedOn;
    this.claimedTile = claimedTile;
  }
}
