import { TurnBasedEvent } from './turn-based-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { Turn } from '../turn';

export class TileDiscarded extends TurnBasedEvent {
  public readonly actor: SeatPosition;

  public readonly fromConcealed: boolean;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    fromConcealed: boolean,
    seat: SeatPosition,
    turn: Turn,
  ) {
    super(turn);

    this.tile = tile;
    this.fromConcealed = fromConcealed;
    this.actor = seat;
  }
}
