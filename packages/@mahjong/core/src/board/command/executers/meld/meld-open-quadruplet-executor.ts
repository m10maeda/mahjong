import {
  OpenQuadruplet,
  OpenQuadrupletMelded,
  type BoardEvent,
} from '../../../event';
import { MeldOperation, MeldTileGroup, type Board } from '../../../models';

import type { MeldOpenQuadruplet } from '../../meld';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class MeldOpenQuadrupletExecutor implements IBoardCommandExecutor<
  MeldOpenQuadruplet,
  Board
> {
  public execute(
    command: MeldOpenQuadruplet,
    board: Board,
  ): readonly [BoardEvent, Board] {
    const operation = new MeldOperation(
      new MeldTileGroup(...command.consumedTiles, command.claimedTile),
      command.consumedTiles,
      command.claimedTile,
    );
    const newBoard = board.meld(command.seat, operation);

    const event = new OpenQuadrupletMelded(
      new OpenQuadruplet(command.consumedTiles, command.claimedTile),
      command.seat,
      command.claimedOn,
      command.currentTurn,
    );

    return [event, newBoard];
  }
}
