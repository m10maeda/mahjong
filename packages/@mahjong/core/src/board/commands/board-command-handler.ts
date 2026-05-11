import type { BoardCommand } from './board-command';

export interface IBoardCommandHandler {
  handle(command: BoardCommand): Promise<void>;
}
