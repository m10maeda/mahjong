import { Melded } from './melded';

import type { Round } from '../../../round';
import type { SeatPosition } from '../../../table';
import type { Tile } from '../../../tile';
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
