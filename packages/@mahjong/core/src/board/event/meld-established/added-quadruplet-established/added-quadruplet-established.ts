import { MeldEstablished } from '../meld-established';

import type { AddedQuadruplet } from './added-quadruplet';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';
import type { Triplet } from '../triplet-established';

export class AddedQuadrupletEstablished extends MeldEstablished {
  public readonly consumed: Triplet;

  public readonly created: AddedQuadruplet;

  public readonly from: SeatPosition;

  public constructor(
    created: AddedQuadruplet,
    consumed: Triplet,
    seat: SeatPosition,
    from: SeatPosition,
    turn: Turn,
  ) {
    super(seat, turn);

    this.created = created;
    this.consumed = consumed;
    this.from = from;
  }
}
