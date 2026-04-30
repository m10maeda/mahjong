import { MeldEstablished } from '../meld-established';

import type { ClosedQuadruplet } from './closed-quadruplet';
import type { Round } from '../../../../round';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class ClosedQuadrupletEstablished extends MeldEstablished {
  public readonly created: ClosedQuadruplet;

  public constructor(
    created: ClosedQuadruplet,
    seat: SeatPosition,
    turn: Turn,
    round: Round,
  ) {
    super(seat, turn, round);

    this.created = created;
  }
}
