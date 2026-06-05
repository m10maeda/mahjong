import { Melded } from './melded';

import type { Round, SeatPosition, Tile } from '../../../concepts';
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
