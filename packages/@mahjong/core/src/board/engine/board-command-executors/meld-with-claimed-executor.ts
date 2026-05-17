import { MeldWithClaimed } from '../../commands';

import type { MeldedWithClaimed } from '../../events';
import type { Board } from '../../models';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class MeldWithClaimedExecuter implements IBoardCommandExecutor<
  Board,
  MeldWithClaimed
> {
  public execute(
    command: MeldWithClaimed,
    board: Board,
  ): readonly [MeldedWithClaimed, Board] {
    return board.meldWithClaimed(
      command.seat,
      command.claimedTile,
      command.claimedOn,
      command.consumedTiles,
    );
  }
}
