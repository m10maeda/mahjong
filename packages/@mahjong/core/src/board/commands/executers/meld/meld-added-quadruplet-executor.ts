import {
  AddedQuadruplet,
  AddedQuadrupletMelded,
  type BoardEvent,
} from '../../../events';
import { MeldOperation, MeldTileGroup, type Board } from '../../../models';

import type { MeldAddedQuadruplet } from '../../meld';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class MeldAddedQuadrupletExecutor implements IBoardCommandExecutor<
  MeldAddedQuadruplet,
  Board
> {
  public execute(
    command: MeldAddedQuadruplet,
    board: Board,
  ): readonly [BoardEvent, Board] {
    const operation = new MeldOperation(
      new MeldTileGroup(...command.base, command.consumedTile),
      [command.consumedTile],
    );
    const newBoard = board.meld(command.seat, operation);

    const event = new AddedQuadrupletMelded(
      new AddedQuadruplet(command.base, command.consumedTile),
      command.base,
      command.seat,
    );

    return [event, newBoard];
  }
}
