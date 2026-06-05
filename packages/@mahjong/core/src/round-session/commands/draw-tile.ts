import { RoundSessionCommand } from './round-session-command';

import type { SeatPosition } from '../../table';

export class DrawTile extends RoundSessionCommand {
  public readonly seat: SeatPosition;

  public constructor(seat: SeatPosition) {
    super();

    this.seat = seat;
  }

  public static isDrawTile(command: RoundSessionCommand): command is DrawTile {
    return command instanceof DrawTile;
  }
}
