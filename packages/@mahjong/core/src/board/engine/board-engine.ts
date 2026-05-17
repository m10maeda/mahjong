import type { BoardCommand } from '../commands';
import type { BoardEvent } from '../events';
import type { IBoardEngine } from '../runtime';
import type { IBoardCommandExecutor } from './board-command-executor';

export class BoardEngine<TBoard> implements IBoardEngine<TBoard> {
  private readonly executor: IBoardCommandExecutor<TBoard>;

  public execute(
    command: BoardCommand,
    board: TBoard,
  ): readonly [BoardEvent, TBoard] {
    return this.executor.execute(command, board);
  }

  public constructor(executor: IBoardCommandExecutor<TBoard>) {
    this.executor = executor;
  }
}
