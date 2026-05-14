import type { BoardCommand } from '../commands';
import type { BoardEvent } from '../events';

export interface IBoardEngine<TBoard> {
  execute(command: BoardCommand, board: TBoard): readonly [BoardEvent, TBoard];
}
