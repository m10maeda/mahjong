import { TileDrawn, TileDrawnSource, type BoardEvent } from '../event';
import { BoardCommand } from '../models/board';

import type { SeatPosition } from '../../seat-position';
import type { Board } from '../models/board';
import type { Turn } from '../turn';

export class DrawTileFromWall extends BoardCommand<Board> {
  private readonly currentTurn: Turn;

  private readonly drawer: SeatPosition;

  public execute(prevBoard: Board): [Board, BoardEvent] {
    const [drawTile, newBoard] = prevBoard.draw(this.drawer);

    const event = new TileDrawn(
      drawTile,
      this.drawer,
      TileDrawnSource.Wall,
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
