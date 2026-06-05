import { Melded } from './melded';

import type { Round } from '../../../round';
import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';
import type { MeldReference } from '../../meld-reference';

export class OpenQuadrupletMelded extends Melded {
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
