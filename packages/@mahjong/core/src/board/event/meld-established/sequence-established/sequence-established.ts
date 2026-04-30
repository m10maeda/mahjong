import { MeldEstablished } from '../meld-established';

import type { Sequence } from './sequence';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class SequenceEstablished extends MeldEstablished {
  public readonly created: Sequence;

  public readonly from: SeatPosition;

  public constructor(
    created: Sequence,
    seat: SeatPosition,
    from: SeatPosition,
    turn: Turn,
  ) {
    super(seat, turn);

    this.created = created;
    this.from = from;
  }
}
