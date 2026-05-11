import { TileDrawn, TileDrawnSource, type BoardEvent } from '../../events';

import type { IBoardCommandExecutor } from './board-command-executor';
import type { Board } from '../../models';
import type { DrawTileFromDeadWall } from '../draw-tile-from-dead-wall';

export class DrawTileFromDeadWallExecutor implements IBoardCommandExecutor<
  DrawTileFromDeadWall,
  Board
> {
  public execute(
    command: DrawTileFromDeadWall,
    board: Board,
  ): readonly [BoardEvent, Board] {
    const [drawTile, newBoard] = board.drawFromDeadWall(command.seat);

    const event = new TileDrawn(
      drawTile,
      command.seat,
      TileDrawnSource.DeadWall,
      command.currentTurn,
    );

    return [event, newBoard];
  }
}
