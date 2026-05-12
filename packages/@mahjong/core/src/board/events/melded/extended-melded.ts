import { Melded } from './melded';

import type { MeldReference } from './meld-reference';
import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';

export class ExtendedMelded extends Melded {
  public constructor(
    reference: MeldReference,
    seat: SeatPosition,
    consumedTiles: readonly Tile[],
  ) {
    super(reference, seat, consumedTiles);
  }
}
