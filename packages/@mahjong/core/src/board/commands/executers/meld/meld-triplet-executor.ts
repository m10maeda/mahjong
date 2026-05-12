import { OpenTriplet, TripletMelded, type BoardEvent } from '../../../events';
import { MeldOperation, MeldTileGroup, type Board } from '../../../models';

import type { MeldTriplet } from '../../meld';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class MeldTripletExecutor implements IBoardCommandExecutor<
  MeldTriplet,
  Board
> {
  public execute(
    command: MeldTriplet,
    board: Board,
  ): readonly [BoardEvent, Board] {
    const operation = new MeldOperation(
      new MeldTileGroup(...command.consumedTiles, command.claimedTile),
      command.consumedTiles,
      command.claimedTile,
    );
    const newBoard = board.meld(command.seat, operation);

    const event = new TripletMelded(
      new OpenTriplet(command.consumedTiles, command.claimedTile),
      command.seat,
      command.claimedOn,
    );

    return [event, newBoard];
  }
}
