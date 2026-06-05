import { Melded } from './melded';

import type { Round, SeatPosition, Tile } from '../../../concepts';
import type { MeldReference } from '../../meld-reference';

export class AddedQuadrupletMelded extends Melded {
  public constructor(
    reference: MeldReference,
    consumedTile: Tile,
    seat: SeatPosition,
    round: Round,
  ) {
    super(reference, [consumedTile], seat, round);
  }
}
