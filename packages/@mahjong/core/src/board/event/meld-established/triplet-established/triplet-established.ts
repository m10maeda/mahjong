import { MeldEstablished } from '../meld-established';

import type { Triplet } from './triplet';
import type { Round } from '../../../../round';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class TripletEstablished extends MeldEstablished {
  public readonly created: Triplet;

  public readonly from: SeatPosition;

  public constructor(
    created: Triplet,
    seat: SeatPosition,
    from: SeatPosition,
    turn: Turn,
    round: Round,
  ) {
    super(seat, turn, round);

    this.created = created;
    this.from = from;
  }
}
