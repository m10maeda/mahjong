import { RoundEvent } from './round-event';

import type { SeatPosition } from '../../seat-position';
import type { Round } from '../round';

export class RoundStarted extends RoundEvent {
  public readonly dealer: SeatPosition;

  public constructor(round: Round, dealer: SeatPosition) {
    super(round);

    this.dealer = dealer;
  }
}
