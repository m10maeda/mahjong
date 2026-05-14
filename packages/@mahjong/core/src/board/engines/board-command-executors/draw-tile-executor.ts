import { DrawTile, DrawTileSource } from '../../commands';

import type { TileDrawn } from '../../events';
import type { Board } from '../../models';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class DrawTileExecuter implements IBoardCommandExecutor<
  Board,
  DrawTile
> {
  public execute(command: DrawTile, board: Board): readonly [TileDrawn, Board] {
    if (command.source === DrawTileSource.DeadWall)
      return board.drawFromDeadWall(command.seat);

    return board.draw(command.seat);
  }
}
