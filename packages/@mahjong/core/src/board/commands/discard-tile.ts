import { BoardCommand } from './board-command';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';
import type { Turn } from '../turn';

export class DiscardTile extends BoardCommand {
  public readonly currentTurn: Turn;

  public readonly fromConcealed: boolean;

  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public constructor(
    seat: SeatPosition,
    tile: Tile,
    fromConcealed: boolean,
    currentTurn: Turn,
  ) {
    super();

    this.seat = seat;
    this.tile = tile;
    this.fromConcealed = fromConcealed;
    this.currentTurn = currentTurn;
  }
}
