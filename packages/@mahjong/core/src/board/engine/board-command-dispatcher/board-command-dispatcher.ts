import type { BoardCommandExecutorBinding } from './board-command-executor-binding';
import type { BoardCommand } from '../../commands';
import type { BoardEvent } from '../../events';
import type { IBoardCommandExecutor } from '../board-command-executor';

export class BoardCommandDispatcher<
  TBoard,
> implements IBoardCommandExecutor<TBoard> {
  private readonly bindings: readonly BoardCommandExecutorBinding<TBoard>[];

  public execute(
    command: BoardCommand,
    board: TBoard,
  ): readonly [BoardEvent, TBoard] {
    const binding = this.bindings.find((subscription) =>
      subscription.canExecute(command),
    );

    if (!binding)
      throw new Error(`No executor for ${command.constructor.name}`);

    return binding.execute(command, board);
  }

  public constructor(
    ...bindings: readonly BoardCommandExecutorBinding<TBoard>[]
  ) {
    this.bindings = bindings;
  }
}
