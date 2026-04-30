import { MeldEstablished } from '../meld-established';

import type { OpenQuadruplet } from './open-quadruplet';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class OpenQuadrupletEstablished extends MeldEstablished {
  public readonly created: OpenQuadruplet;

  public readonly from: SeatPosition;

  public constructor(
    created: OpenQuadruplet,
    seat: SeatPosition,
    from: SeatPosition,
    turn: Turn,
  ) {
    super(seat, turn);

    this.created = created;
    this.from = from;
  }
}
