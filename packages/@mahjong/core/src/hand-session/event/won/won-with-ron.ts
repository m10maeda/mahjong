import { Won } from './won';

import type { SeatPosition } from '../../../seat-position';

export class WonWithRon extends Won {
  public readonly winners: readonly [SeatPosition, ...SeatPosition[]];

  public constructor(winners: readonly [SeatPosition, ...SeatPosition[]]) {
    super();

    this.winners = winners;
  }
}
