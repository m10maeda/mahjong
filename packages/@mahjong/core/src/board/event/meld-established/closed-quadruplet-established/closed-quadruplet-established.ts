import { MeldEstablished } from '../meld-established';

import type { ClosedQuadruplet } from './closed-quadruplet';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class ClosedQuadrupletEstablished extends MeldEstablished {
  public readonly created: ClosedQuadruplet;

  public constructor(
    created: ClosedQuadruplet,
    actor: SeatPosition,
    turn: Turn,
  ) {
    super(actor, turn);

    this.created = created;
  }
}
