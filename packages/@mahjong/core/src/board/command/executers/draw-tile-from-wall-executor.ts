import { TileDrawn, TileDrawnSource, type BoardEvent } from '../../event';

import type { IBoardCommandExecutor } from './board-command-executor';
import type { Board } from '../../models';
import type { DrawTileFromWall } from '../draw-tile-from-wall';

export class DrawTileFromWallExecutor implements IBoardCommandExecutor<
  DrawTileFromWall,
  Board
> {
  public execute(
    command: DrawTileFromWall,
    board: Board,
  ): readonly [BoardEvent, Board] {
    const [drawTile, newBoard] = board.draw(command.seat);

    const event = new TileDrawn(
      drawTile,
      command.seat,
      TileDrawnSource.Wall,
      command.currentTurn,
    );

    return [event, newBoard];
  }
}
