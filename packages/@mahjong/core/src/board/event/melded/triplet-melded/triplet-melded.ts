import { Melded } from '../melded';

import type { OpenTriplet } from './open-triplet';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class TripletMelded extends Melded {
  public readonly from: SeatPosition;

  public readonly made: OpenTriplet;

  public constructor(
    made: OpenTriplet,
    melder: SeatPosition,
    from: SeatPosition,
    turn: Turn,
  ) {
    super(melder, turn);

    this.made = made;
    this.from = from;
  }
}
