import { RoundSessionEnded } from './round-session-ended';

import type { Round, SeatPosition } from '../../concepts';

export class NagashiManganOccurred extends RoundSessionEnded {
  public readonly qualifiedSeats: readonly [SeatPosition, ...SeatPosition[]];

  public constructor(
    qualifiedSeats: readonly [SeatPosition, ...SeatPosition[]],
    round: Round,
  ) {
    super(round);

    this.qualifiedSeats = qualifiedSeats;
  }
}
