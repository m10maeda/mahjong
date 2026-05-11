import { TurnBasedEvent } from './turn-based-event';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { Turn } from '../turn';

export class TileDiscarded extends TurnBasedEvent {
  public readonly discarder: SeatPosition;

  public readonly fromConcealed: boolean;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    fromConcealed: boolean,
    discarder: SeatPosition,
    turn: Turn,
  ) {
    super(turn);

    this.tile = tile;
    this.fromConcealed = fromConcealed;
    this.discarder = discarder;
  }
}
