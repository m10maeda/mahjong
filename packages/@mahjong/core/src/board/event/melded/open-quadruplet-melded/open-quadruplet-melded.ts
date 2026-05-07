import { Melded } from '../melded';

import type { OpenQuadruplet } from './open-quadruplet';
import type { SeatPosition } from '../../../../seat-position';
import type { Turn } from '../../../turn';

export class OpenQuadrupletMelded extends Melded {
  public readonly from: SeatPosition;

  public readonly made: OpenQuadruplet;

  public constructor(
    made: OpenQuadruplet,
    melder: SeatPosition,
    from: SeatPosition,
    turn: Turn,
  ) {
    super(melder, turn);

    this.made = made;
    this.from = from;
  }
}
