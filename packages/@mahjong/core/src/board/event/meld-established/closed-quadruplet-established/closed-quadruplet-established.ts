import { MeldEstablished } from '../meld-established';

import type { ClosedQuadruplet } from './closed-quadruplet';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class ClosedQuadrupletEstablished extends MeldEstablished {
  public readonly created: ClosedQuadruplet;

  public constructor(
    created: ClosedQuadruplet,
    seat: SeatPosition,
    turn: Turn,
  ) {
    super(seat, turn);

    this.created = created;
  }
}
