import { Melded } from '../melded';

import type { ClosedQuadruplet } from './closed-quadruplet';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class ClosedQuadrupletMelded extends Melded {
  public readonly made: ClosedQuadruplet;

  public constructor(made: ClosedQuadruplet, melder: SeatPosition, turn: Turn) {
    super(melder, turn);

    this.made = made;
  }
}
