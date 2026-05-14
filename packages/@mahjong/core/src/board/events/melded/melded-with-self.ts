import { Melded } from './melded';

import type { MeldReference } from './meld-reference';
import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';

export class MeldedFromSelf extends Melded {
  public constructor(
    reference: MeldReference,
    seat: SeatPosition,
    consumedTiles: readonly Tile[],
  ) {
    super(reference, seat, consumedTiles);
  }
}
