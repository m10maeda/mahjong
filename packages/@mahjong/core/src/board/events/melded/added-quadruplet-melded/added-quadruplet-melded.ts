import { Melded } from '../melded';

import type { AddedQuadruplet } from './added-quadruplet';
import type { SeatPosition } from '../../../../seat-position';
import type { OpenTriplet } from '../triplet-melded';

export class AddedQuadrupletMelded extends Melded {
  public readonly base: OpenTriplet;

  public readonly made: AddedQuadruplet;

  public constructor(
    made: AddedQuadruplet,
    base: OpenTriplet,
    melder: SeatPosition,
  ) {
    super(melder);

    this.made = made;
    this.base = base;
  }
}
