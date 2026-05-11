import type {
  BoardCommand,
  IBoardCommandApplier,
} from './board-command-applier';

export interface IBoardCommandHandler {
  handle(command: BoardCommand<IBoardCommandApplier>): Promise<void>;
}
