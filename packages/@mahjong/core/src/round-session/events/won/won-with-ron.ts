import { Won } from './won';

import type { Round, SeatPosition } from '../../../concepts';

export enum RonType {
  Normal,
  Chankan,
}

export class WonWithRon extends Won {
  public readonly type: RonType;

  public readonly winners: readonly [SeatPosition, ...SeatPosition[]];

  public constructor(
    round: Round,
    winners: readonly [SeatPosition, ...SeatPosition[]],
    type: RonType,
  ) {
    super(round);

    this.winners = winners;
    this.type = type;
  }
}
