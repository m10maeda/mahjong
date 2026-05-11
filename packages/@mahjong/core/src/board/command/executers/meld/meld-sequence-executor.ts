import { OpenSequence, SequenceMelded, type BoardEvent } from '../../../event';
import { MeldOperation, MeldTileGroup, type Board } from '../../../models';

import type { MeldSequence } from '../../meld';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class MeldSequenceExecutor implements IBoardCommandExecutor<
  MeldSequence,
  Board
> {
  public execute(
    command: MeldSequence,
    board: Board,
  ): readonly [BoardEvent, Board] {
    const operation = new MeldOperation(
      new MeldTileGroup(...command.consumedTiles, command.claimedTile),
      command.consumedTiles,
      command.claimedTile,
    );
    const newBoard = board.meld(command.seat, operation);

    const event = new SequenceMelded(
      new OpenSequence(command.consumedTiles, command.claimedTile),
      command.seat,
      command.claimedOn,
      command.currentTurn,
    );

    return [event, newBoard];
  }
}
