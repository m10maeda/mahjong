import { BoardCommand } from './board-command';

import type { SeatPosition } from '../../seat-position';

export class DrawTileFromDeadWall extends BoardCommand {
  public readonly seat: SeatPosition;

  public constructor(seat: SeatPosition) {
    super();

    this.seat = seat;
  }
}
