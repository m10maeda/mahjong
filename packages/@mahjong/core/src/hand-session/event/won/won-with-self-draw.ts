import { Won } from './won';

import type { SeatPosition } from '../../../seat-position';

export class WonWithSelfDraw extends Won {
  public readonly winner: SeatPosition;

  public constructor(winner: SeatPosition) {
    super();

    this.winner = winner;
  }
}
