import { Won } from './won';

import type { Round, SeatPosition } from '../../../concepts';

export class WonWithSelfDraw extends Won {
  public readonly winner: SeatPosition;

  public constructor(round: Round, winner: SeatPosition) {
    super(round);

    this.winner = winner;
  }
}
