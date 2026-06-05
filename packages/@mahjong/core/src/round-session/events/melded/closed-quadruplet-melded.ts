import { Melded } from './melded';

import type { Round } from '../../../round';
import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';
import type { MeldReference } from '../../meld-reference';

export class ClosedQuadrupletMelded extends Melded {
  public constructor(
    reference: MeldReference,
    consumedTiles: readonly [Tile, Tile, Tile, Tile],
    seat: SeatPosition,
    round: Round,
  ) {
    super(reference, consumedTiles, seat, round);
  }
}
