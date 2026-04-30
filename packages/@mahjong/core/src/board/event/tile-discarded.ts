import { TurnBasedEvent } from './turn-based-event';

import type { Round } from '../../round';
import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { Turn } from '../turn';

export class TileDiscarded extends TurnBasedEvent {
  public readonly fromConcealed: boolean;

  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public constructor(
    tile: Tile,
    fromConcealed: boolean,
    seat: SeatPosition,
    turn: Turn,
    round: Round,
  ) {
    super(turn, round);

    this.tile = tile;
    this.fromConcealed = fromConcealed;
    this.seat = seat;
  }
}
