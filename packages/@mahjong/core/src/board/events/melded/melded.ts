import { TurnBasedEvent } from '../turn-based-event';

import type { Meld } from './tile-group';
import type { SeatPosition } from '../../../seat-position';
import type { Turn } from '../../turn';

export abstract class Melded extends TurnBasedEvent {
  public abstract readonly made: Meld;

  public readonly melder: SeatPosition;

  public constructor(melder: SeatPosition, turn: Turn) {
    super(turn);

    this.melder = melder;
  }
}
