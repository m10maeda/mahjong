import { BoardCommand } from '../board-command';

import type { SeatPosition } from '../../../seat-position';
import type { Tile } from '../../../tile';
import type { Turn } from '../../turn';

export class MeldClosedQuadruplet extends BoardCommand {
  public readonly consumedTiles: readonly [Tile, ...Tile[]];

  public readonly currentTurn: Turn;

  public readonly seat: SeatPosition;

  public constructor(
    seat: SeatPosition,
    consumedTiles: readonly [Tile, ...Tile[]],
    currentTurn: Turn,
  ) {
    super();

    this.seat = seat;
    this.consumedTiles = consumedTiles;
    this.currentTurn = currentTurn;
  }
}
