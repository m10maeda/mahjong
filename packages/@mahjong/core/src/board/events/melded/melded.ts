import { BoardEvent } from '../board-event';

import type { Meld } from './tile-group';
import type { SeatPosition } from '../../../seat-position';

export abstract class Melded extends BoardEvent {
  public abstract readonly made: Meld;

  public readonly melder: SeatPosition;

  public constructor(melder: SeatPosition) {
    super();

    this.melder = melder;
  }
}
