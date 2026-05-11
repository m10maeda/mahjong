import type { BoardEvent } from './event';

export abstract class BoardCommand<TBoard extends IBoardCommandApplier> {
  public abstract execute(prevBoard: TBoard): readonly [TBoard, BoardEvent];
}

export interface IBoardCommandApplier {
  apply(
    command: BoardCommand<IBoardCommandApplier>,
  ): readonly [IBoardCommandApplier, BoardEvent];
}
