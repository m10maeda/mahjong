import { RoundSessionEvent } from './round-session-event';

import type { Round, SeatPosition } from '../../concepts';

export class RiichiEstablished extends RoundSessionEvent {
  public readonly seat: SeatPosition;

  public constructor(seat: SeatPosition, round: Round) {
    super(round);

    this.seat = seat;
  }
}
