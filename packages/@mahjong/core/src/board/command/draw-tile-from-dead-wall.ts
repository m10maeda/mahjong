import { BoardCommand } from '../board';
import { TileDrawn, TileDrawnSource, type BoardEvent } from '../event';

import type { SeatPosition } from '../../seat-position';
import type { Board } from '../board';
import type { Turn } from '../turn';

export class DrawTileFromDeadWall extends BoardCommand<Board> {
  private readonly currentTurn: Turn;

  private readonly drawer: SeatPosition;

  public execute(prevBoard: Board): [Board, BoardEvent] {
    const [drawTile, newBoard] = prevBoard.drawFromDeadWall(this.drawer);

    const event = new TileDrawn(
      drawTile,
      this.drawer,
      TileDrawnSource.DeadWall,
      this.currentTurn,
    );

    return [newBoard, event];
  }

  public constructor(drawer: SeatPosition, currentTurn: Turn) {
    super();

    this.drawer = drawer;
    this.currentTurn = currentTurn;
  }
}
