import { MeldFromSelf } from '../../commands';

import type { MeldedFromSelf } from '../../events';
import type { Board } from '../../models';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class MeldFromSelfExecuter implements IBoardCommandExecutor<
  Board,
  MeldFromSelf
> {
  public execute(
    command: MeldFromSelf,
    board: Board,
  ): readonly [MeldedFromSelf, Board] {
    return board.meldFromSelf(command.seat, command.consumedTiles);
  }
}
