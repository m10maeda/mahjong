import { Melded } from '../melded';

import type { OpenSequence } from './open-sequence';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class SequenceMelded extends Melded {
  public readonly from: SeatPosition;

  public readonly made: OpenSequence;

  public constructor(
    made: OpenSequence,
    melder: SeatPosition,
    from: SeatPosition,
    turn: Turn,
  ) {
    super(melder, turn);

    this.made = made;
    this.from = from;
  }
}
