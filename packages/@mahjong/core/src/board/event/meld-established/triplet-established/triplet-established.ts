import { MeldEstablished } from '../meld-established';

import type { Triplet } from './triplet';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class TripletEstablished extends MeldEstablished {
  public readonly created: Triplet;

  public readonly from: SeatPosition;

  public constructor(
    created: Triplet,
    actor: SeatPosition,
    from: SeatPosition,
    turn: Turn,
  ) {
    super(actor, turn);

    this.created = created;
    this.from = from;
  }
}
