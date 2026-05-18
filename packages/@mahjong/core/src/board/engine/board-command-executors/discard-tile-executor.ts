import { DiscardTile } from '../../commands';

import type { TileDiscarded } from '../../events';
import type { Board } from '../../models';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class DiscardTileExecuter implements IBoardCommandExecutor<
  Board,
  DiscardTile
> {
  public execute(
    command: DiscardTile,
    board: Board,
  ): readonly [TileDiscarded, Board] {
    return board.discard(command.tile, command.seat, command.fromDrawnTile);
  }
}
