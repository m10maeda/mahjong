import { Melded } from '../melded';

import type { ClosedQuadruplet } from './closed-quadruplet';
import type { SeatPosition } from '../../../../seat-position';

export class ClosedQuadrupletMelded extends Melded {
  public readonly made: ClosedQuadruplet;

  public constructor(made: ClosedQuadruplet, melder: SeatPosition) {
    super(melder);

    this.made = made;
  }
}
