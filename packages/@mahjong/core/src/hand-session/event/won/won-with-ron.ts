import { Won } from './won';

import type { Round } from '../../../round';
import type { SeatPosition } from '../../../table';

export class WonWithRon extends Won {
  public readonly winners: readonly [SeatPosition, ...SeatPosition[]];

  public constructor(
    round: Round,
    winners: readonly [SeatPosition, ...SeatPosition[]],
  ) {
    super(round);

    this.winners = winners;
  }
}
