import { BoardCommand } from './board-command';

import type { SeatPosition } from '../../seat-position';
import type { Tile } from '../../tile';

export class DiscardTile extends BoardCommand {
  public readonly fromConcealed: boolean;

  public readonly seat: SeatPosition;

  public readonly tile: Tile;

  public constructor(seat: SeatPosition, tile: Tile, fromConcealed: boolean) {
    super();

    this.seat = seat;
    this.tile = tile;
    this.fromConcealed = fromConcealed;
  }
}
