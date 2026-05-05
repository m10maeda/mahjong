import { RoundWon } from './round-won';

import type { SeatPosition } from '../../../seat-position';
import type { Round } from '../../round';

export class RonDeclarationResolved extends RoundWon {
  public readonly winners: readonly [SeatPosition, ...SeatPosition[]];

  public constructor(
    round: Round,
    winners: readonly [SeatPosition, ...SeatPosition[]],
  ) {
    super(round);

    this.winners = winners;
  }
}
