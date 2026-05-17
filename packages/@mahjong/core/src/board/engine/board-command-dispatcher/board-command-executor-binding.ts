import type { BoardCommand } from '../../commands';
import type { BoardEvent } from '../../events';
import type { IBoardCommandExecutor } from '../board-command-executor';

export type BoardCommandClass<TCommand extends BoardCommand> = abstract new (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => TCommand;

export class BoardCommandExecutorBinding<
  TBoard,
  TCommand extends BoardCommand = BoardCommand,
> {
  private readonly Command: BoardCommandClass<TCommand>;

  private readonly executor: IBoardCommandExecutor<TBoard, TCommand>;

  public canExecute(command: BoardCommand): command is TCommand {
    return command instanceof this.Command;
  }

  public execute(
    command: TCommand,
    board: TBoard,
  ): readonly [BoardEvent, TBoard] {
    return this.executor.execute(command, board);
  }

  public constructor(
    Command: BoardCommandClass<TCommand>,
    executor: IBoardCommandExecutor<TBoard, TCommand>,
  ) {
    this.Command = Command;
    this.executor = executor;
  }
}
