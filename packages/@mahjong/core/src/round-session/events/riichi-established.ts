import { RoundSessionEvent } from './round-session-event';

import type { Round } from '../../round';
import type { SeatPosition } from '../../table';

export class RiichiEstablished extends RoundSessionEvent {
  public readonly seat: SeatPosition;

  public constructor(seat: SeatPosition, round: Round) {
    super(round);

    this.seat = seat;
  }
}
