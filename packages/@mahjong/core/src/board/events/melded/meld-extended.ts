import { Melded } from './melded';

import type { SeatPosition, Tile } from '../../../concepts';
import type { MeldReference } from '../../concepts';

export class MeldExtended extends Melded {
  public constructor(
    reference: MeldReference,
    seat: SeatPosition,
    consumedTiles: readonly Tile[],
  ) {
    super(reference, seat, consumedTiles);
  }
}
