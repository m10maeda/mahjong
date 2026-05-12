import {
  ClosedQuadruplet,
  ClosedQuadrupletMelded,
  type BoardEvent,
} from '../../../events';
import { MeldOperation, MeldTileGroup, type Board } from '../../../models';

import type { MeldClosedQuadruplet } from '../../meld';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class MeldClosedQuadrupletExecutor implements IBoardCommandExecutor<
  MeldClosedQuadruplet,
  Board
> {
  public execute(
    command: MeldClosedQuadruplet,
    board: Board,
  ): readonly [BoardEvent, Board] {
    const operation = new MeldOperation(
      new MeldTileGroup(...command.consumedTiles),
      command.consumedTiles,
    );
    const newBoard = board.meld(command.seat, operation);

    const event = new ClosedQuadrupletMelded(
      new ClosedQuadruplet(command.consumedTiles),
      command.seat,
    );

    return [event, newBoard];
  }
}
