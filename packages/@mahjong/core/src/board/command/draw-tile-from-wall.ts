import { BoardCommand } from './board-command';

import type { SeatPosition } from '../../seat-position';
import type { Turn } from '../turn';

export class DrawTileFromWall extends BoardCommand {
  public readonly currentTurn: Turn;

  public readonly seat: SeatPosition;

  public constructor(seat: SeatPosition, currentTurn: Turn) {
    super();

    this.seat = seat;
    this.currentTurn = currentTurn;
  }
}
