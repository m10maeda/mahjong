import { Won } from './won';

import type { Round } from '../../../round';
import type { SeatPosition } from '../../../table';

export class WonWithSelfDraw extends Won {
  public readonly winner: SeatPosition;

  public constructor(round: Round, winner: SeatPosition) {
    super(round);

    this.winner = winner;
  }
}
