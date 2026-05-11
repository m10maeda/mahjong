import { TileDiscarded, type BoardEvent } from '../../events';

import type { IBoardCommandExecutor } from './board-command-executor';
import type { Board } from '../../models';
import type { DiscardTile } from '../discard-tile';

export class DiscardTileExecutor implements IBoardCommandExecutor<
  DiscardTile,
  Board
> {
  public execute(
    command: DiscardTile,
    board: Board,
  ): readonly [BoardEvent, Board] {
    const newBoard = board.discard(command.tile, command.seat);

    const event = new TileDiscarded(
      command.tile,
      command.fromConcealed,
      command.seat,
      command.currentTurn,
    );

    return [event, newBoard];
  }
}
