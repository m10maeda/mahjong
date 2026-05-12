import { BoardCommand } from '../board-command';

import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';

export class MeldClosedQuadruplet extends BoardCommand {
  public readonly consumedTiles: readonly [Tile, ...Tile[]];

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    consumedTiles: readonly [Tile, ...Tile[]],
  ) {
    super();

    this.seat = seat;
    this.consumedTiles = consumedTiles;
  }
}
