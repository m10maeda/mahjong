import type { BoardEvent } from '../../event';
import type { BoardCommand } from '../board-command';

export interface IBoardCommandExecutor<TCommand extends BoardCommand, TBoard> {
  execute(command: TCommand, board: TBoard): readonly [BoardEvent, TBoard];
}
