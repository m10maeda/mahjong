import { TurnBasedEvent } from '../turn-based-event';

import type { Meld } from './meld';
import type { SeatPosition } from '../../../seat-position';
import type { Turn } from '../../turn';

export abstract class MeldEstablished extends TurnBasedEvent {
  public abstract readonly created: Meld;

  public readonly seat: SeatPosition;

  public constructor(seat: SeatPosition, turn: Turn) {
    super(turn);

    this.seat = seat;
  }
}
