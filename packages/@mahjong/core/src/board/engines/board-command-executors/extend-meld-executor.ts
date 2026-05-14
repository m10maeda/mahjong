import { ExtendMeld } from '../../commands';

import type { MeldExtended } from '../../events';
import type { Board } from '../../models';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class ExtendMeldExecuter implements IBoardCommandExecutor<
  Board,
  ExtendMeld
> {
  public execute(
    command: ExtendMeld,
    board: Board,
  ): readonly [MeldExtended, Board] {
    return board.extendMeld(
      command.seat,
      command.baseMeld,
      command.consumedTiles,
    );
  }
}
