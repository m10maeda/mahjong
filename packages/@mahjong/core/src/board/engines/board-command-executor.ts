import type { BoardCommand } from '../commands';
import type { BoardEvent } from '../events';

export interface IBoardCommandExecutor<
  TBoard,
  TBoardCommand extends BoardCommand = BoardCommand,
> {
  execute(command: TBoardCommand, board: TBoard): readonly [BoardEvent, TBoard];
}
