import { RoundSessionEnded } from './round-session-ended';

import type { Round } from '../../round';
import type { SeatPosition } from '../../table';

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
