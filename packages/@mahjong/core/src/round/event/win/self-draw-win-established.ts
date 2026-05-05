import { RoundWon } from './round-won';

import type { SeatPosition } from '../../../seat-position';
import type { Round } from '../../round';

export class SelfDrawWinEstablished extends RoundWon {
  public readonly winner: SeatPosition;

  public constructor(round: Round, winner: SeatPosition) {
    super(round);

    this.winner = winner;
  }
}
